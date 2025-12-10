"""
FastAPI Application for YUNO Recommendation System
Uses ChromaDB for vector search with RIASEC/OCEAN personality matching

Run with: uvicorn app:app --reload --host 0.0.0.0 --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from contextlib import asynccontextmanager
import chromadb
from sentence_transformers import SentenceTransformer
import os

# =============================================================================
# CONFIGURATION
# =============================================================================

CHROMA_DB_PATH = "./local_vector_db"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# =============================================================================
# GLOBAL STATE (Loaded once at startup)
# =============================================================================

chroma_client: chromadb.PersistentClient = None
embedding_model: SentenceTransformer = None
upskilling_collection = None
holistic_collection = None

# =============================================================================
# LIFESPAN MANAGEMENT
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages application lifecycle.
    Loads ChromaDB client and embedding model once at startup.
    Checks and auto-populates data if database is empty.
    """
    global chroma_client, embedding_model, upskilling_collection, holistic_collection
    
    print("[STARTUP] Initializing YUNO Recommendation System...")
    
    # Load embedding model
    print("[STARTUP] Loading embedding model...")
    embedding_model = SentenceTransformer(EMBEDDING_MODEL)
    print("[STARTUP] Embedding model loaded!")
    
    # Connect to ChromaDB
    print("[STARTUP] Connecting to ChromaDB...")
    chroma_client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
    
    # Get or Create Collections
    upskilling_collection = chroma_client.get_or_create_collection("upskilling")
    holistic_collection = chroma_client.get_or_create_collection("holistic")
    
    # Auto-Populate if empty
    if upskilling_collection.count() == 0:
        print("[STARTUP] Database is empty. Generating synthetic data...")
        try:
            import init_vector_db
            
            # Upskilling
            print("[STARTUP] Generating Upskilling Courses...")
            upskilling_df = init_vector_db.generate_upskilling_data(n_samples=100)
            
            upskilling_collection.add(
                ids=upskilling_df["id"].tolist(),
                documents=upskilling_df["embedding_text"].tolist(),
                metadatas=upskilling_df.drop(columns=["id", "embedding_text"]).to_dict("records")
            )
            print(f"[STARTUP] Added {len(upskilling_df)} courses.")

            # Holistic
            print("[STARTUP] Generating Holistic Events...")
            holistic_df = init_vector_db.generate_holistic_data(n_samples=100)
            
            holistic_collection.add(
                ids=holistic_df["id"].tolist(),
                documents=holistic_df["embedding_text"].tolist(),
                metadatas=holistic_df.drop(columns=["id", "embedding_text"]).to_dict("records")
            )
            print(f"[STARTUP] Added {len(holistic_df)} events.")
            
        except Exception as e:
            print(f"[ERROR] Failed to auto-populate database: {e}")

    print(f"[STARTUP] Upskilling collection: {upskilling_collection.count()} items")
    print(f"[STARTUP] Holistic collection: {holistic_collection.count()} items")
    
    print("[STARTUP] YUNO is ready to serve recommendations!")
    print("=" * 50)
    
    yield  # Application runs here
    
    # Cleanup on shutdown
    print("[SHUTDOWN] YUNO Recommendation System shutting down...")

# =============================================================================
# FASTAPI APP
# =============================================================================

app = FastAPI(
    title="YUNO Recommendation API",
    description="Personality-based activity recommendations for Singapore students (ages 13-25)",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# =============================================================================
# PYDANTIC MODELS
# =============================================================================

class UserQuery(BaseModel):
    """Input model for recommendation requests."""
    user_query: str = Field(
        ...,
        description="Description of what the user wants (e.g., 'I am an Artistic person looking for painting')",
        example="I am an introverted person interested in coding and creative projects"
    )
    user_stage: str = Field(
        ...,
        description="Either 'Secondary' or 'Post-Secondary'",
        example="Post-Secondary"
    )
    limit: int = Field(
        default=3,
        ge=1,
        le=20,
        description="Number of results to return (1-20)"
    )


class RecommendationItem(BaseModel):
    """Single recommendation item."""
    id: str
    score: float
    metadata: Dict[str, Any]


class RecommendationResponse(BaseModel):
    """Response model for recommendations."""
    upskilling_recommendations: List[RecommendationItem]
    holistic_recommendations: List[RecommendationItem]
    query_info: Dict[str, Any]

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def build_audience_filter(user_stage: str) -> Dict:
    """
    Build ChromaDB metadata filter for target audience.
    Secondary students see 'Secondary' or 'Both' content.
    Post-Secondary students see 'Post-Secondary' or 'Both' content.
    """
    if user_stage == "Secondary":
        return {
            "$or": [
                {"target_audience": "Secondary"},
                {"target_audience": "Both"}
            ]
        }
    else:  # Post-Secondary
        return {
            "$or": [
                {"target_audience": "Post-Secondary"},
                {"target_audience": "Both"}
            ]
        }


def query_collection(
    collection,
    query_embedding: List[float],
    audience_filter: Dict,
    n_results: int
) -> List[RecommendationItem]:
    """
    Query a ChromaDB collection with embedding and filter.
    Returns list of RecommendationItems.
    """
    try:
        results = collection.query(
            query_embeddings=[query_embedding],
            where=audience_filter,
            n_results=n_results,
            include=["metadatas", "distances"]
        )
        
        recommendations = []
        if results and results["ids"] and len(results["ids"][0]) > 0:
            for i, doc_id in enumerate(results["ids"][0]):
                # Convert distance to similarity score (lower distance = higher similarity)
                distance = results["distances"][0][i] if results["distances"] else 0
                score = max(0, 1 - distance)  # Normalize to 0-1
                
                recommendations.append(RecommendationItem(
                    id=doc_id,
                    score=round(score, 4),
                    metadata=results["metadatas"][0][i] if results["metadatas"] else {}
                ))
        
        return recommendations
    
    except Exception as e:
        print(f"[ERROR] Query failed: {e}")
        return []

# =============================================================================
# API ENDPOINTS
# =============================================================================

@app.get("/")
async def root():
    """Root endpoint with API info."""
    return {
        "name": "YUNO Recommendation API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "/recommend": "POST - Get personalized recommendations",
            "/health": "GET - Health check",
            "/stats": "GET - Database statistics"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    collections_ready = upskilling_collection is not None and holistic_collection is not None
    return {
        "status": "healthy" if collections_ready else "degraded",
        "embedding_model": EMBEDDING_MODEL,
        "database_path": CHROMA_DB_PATH,
        "collections_loaded": collections_ready
    }


@app.get("/stats")
async def get_stats():
    """Get database statistics."""
    if upskilling_collection is None or holistic_collection is None:
        raise HTTPException(status_code=503, detail="Database not initialized. Run upload.py first.")
    
    return {
        "upskilling_count": upskilling_collection.count(),
        "holistic_count": holistic_collection.count(),
        "total_items": upskilling_collection.count() + holistic_collection.count()
    }


@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(query: UserQuery):
    """
    Get personalized recommendations based on user query and stage.
    
    - Filters by target audience (Secondary/Post-Secondary)
    - Searches BOTH upskilling and holistic collections
    - Returns ranked results from each collection
    """
    
    # Validate collections
    if upskilling_collection is None or holistic_collection is None:
        raise HTTPException(
            status_code=503,
            detail="Database not initialized. Please run upload.py first."
        )
    
    # Validate user_stage
    if query.user_stage not in ["Secondary", "Post-Secondary"]:
        raise HTTPException(
            status_code=400,
            detail="user_stage must be 'Secondary' or 'Post-Secondary'"
        )
    
    # Generate embedding for user query
    query_embedding = embedding_model.encode(query.user_query).tolist()
    
    # Build audience filter
    audience_filter = build_audience_filter(query.user_stage)
    
    # Query both collections
    upskilling_results = query_collection(
        upskilling_collection,
        query_embedding,
        audience_filter,
        query.limit
    )
    
    holistic_results = query_collection(
        holistic_collection,
        query_embedding,
        audience_filter,
        query.limit
    )
    
    return RecommendationResponse(
        upskilling_recommendations=upskilling_results,
        holistic_recommendations=holistic_results,
        query_info={
            "original_query": query.user_query,
            "user_stage": query.user_stage,
            "limit": query.limit,
            "upskilling_found": len(upskilling_results),
            "holistic_found": len(holistic_results)
        }
    )


# =============================================================================
# ADDITIONAL ENDPOINTS
# =============================================================================

@app.get("/collections/{collection_name}/sample")
async def get_sample(collection_name: str, n: int = 5):
    """Get sample items from a collection (for debugging)."""
    
    if collection_name == "upskilling":
        collection = upskilling_collection
    elif collection_name == "holistic":
        collection = holistic_collection
    else:
        raise HTTPException(status_code=404, detail="Collection not found")
    
    if collection is None:
        raise HTTPException(status_code=503, detail="Collection not loaded")
    
    # Get sample
    results = collection.peek(limit=n)
    
    return {
        "collection": collection_name,
        "sample_count": len(results["ids"]) if results["ids"] else 0,
        "items": [
            {"id": results["ids"][i], "metadata": results["metadatas"][i]}
            for i in range(len(results["ids"]))
        ] if results["ids"] else []
    }


# =============================================================================
# RUN INSTRUCTIONS
# =============================================================================
# 
# 1. First, generate synthetic data:
#    python synthetic_data_generator.py
#
# 2. Then, upload to ChromaDB:
#    python upload.py
#
# 3. Finally, run the FastAPI server:
#    uvicorn app:app --reload --host 0.0.0.0 --port 8000
#
# 4. Test the API:
#    curl -X POST "http://localhost:8000/recommend" \
#         -H "Content-Type: application/json" \
#         -d '{"user_query": "I am artistic and love painting", "user_stage": "Post-Secondary", "limit": 3}'
#
# =============================================================================
