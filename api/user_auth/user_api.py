import sqlite3
import json
from typing import List, Optional, Dict
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import bcrypt

import os

# --- Configuration ---
DB_NAME = os.path.join(os.path.dirname(__file__), "users.db")

# --- Models ---
class UserLogin(BaseModel):
    username: str
    password: str

class UserRegister(BaseModel):
    username: str
    password: str
    education_level: str

class BookingRequest(BaseModel):
    user_id: int
    event_id: str
    event_type: str # 'course' or 'event'

class BookingResponse(BaseModel):
    booking_id: int
    user_id: int
    event_id: str
    event_type: str
    status: str
    booking_date: str

class UserResponse(BaseModel):
    user_id: int
    username: str
    education_level: str
    riasec_code: str
    ocean_scores: Dict[str, int] # Returning as a dictionary

# --- Setup ---
app = FastAPI(title="Student Recommendation Auth API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database Helper ---
def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row # Allow accessing columns by name
    return conn

# --- Endpoints ---

@app.post("/register", response_model=UserResponse)
def register_user(user: UserRegister):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if username exists
    cursor.execute("SELECT id FROM users WHERE username = ?", (user.username,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Hash password using bcrypt directly
    # Encode -> Hash -> Decode to UTF-8 string for storage
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    try:
        # Insert User
        cursor.execute("""
            INSERT INTO users (username, password_hash, education_level)
            VALUES (?, ?, ?)
        """, (user.username, hashed_password, user.education_level))
        new_user_id = cursor.lastrowid
        
        # Initialize empty/default profile for new users
        default_riasec = "UNK" # Unknown
        default_ocean = json.dumps({
            "Openness": 50, "Conscientiousness": 50, "Extraversion": 50, 
            "Agreeableness": 50, "Neuroticism": 50
        })
        
        cursor.execute("""
            INSERT INTO user_profiles (user_id, riasec_code, ocean_scores)
            VALUES (?, ?, ?)
        """, (new_user_id, default_riasec, default_ocean))
        
        conn.commit()
        
        return UserResponse(
            user_id=new_user_id,
            username=user.username,
            education_level=user.education_level,
            riasec_code=default_riasec,
            ocean_scores=json.loads(default_ocean)
        )
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.post("/login", response_model=UserResponse)
def login(user: UserLogin):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Fetch user and profile
    cursor.execute("""
        SELECT u.id, u.username, u.password_hash, u.education_level,
               p.riasec_code, p.ocean_scores
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.username = ?
    """, (user.username,))
    
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Verify password using bcrypt direct check
    stored_hash = row["password_hash"]
    if not bcrypt.checkpw(user.password.encode('utf-8'), stored_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Parse OCEAN scores from JSON string
    ocean_data = {}
    if row["ocean_scores"]:
        try:
            ocean_data = json.loads(row["ocean_scores"])
        except:
            ocean_data = {}

    return UserResponse(
        user_id=row["id"],
        username=row["username"],
        education_level=row["education_level"],
        riasec_code=row["riasec_code"] if row["riasec_code"] else "",
        ocean_scores=ocean_data
    )

@app.post("/book", response_model=BookingResponse)
def create_booking(booking: BookingRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO bookings (user_id, event_id, event_type, status)
            VALUES (?, ?, ?, 'confirmed')
        """, (booking.user_id, booking.event_id, booking.event_type))
        
        new_booking_id = cursor.lastrowid
        
        # Fetch created booking to return timestamp
        cursor.execute("SELECT * FROM bookings WHERE booking_id = ?", (new_booking_id,))
        row = cursor.fetchone()
        conn.commit()
        
        return BookingResponse(
            booking_id=row["booking_id"],
            user_id=row["user_id"],
            event_id=row["event_id"],
            event_type=row["event_type"],
            status=row["status"],
            booking_date=str(row["booking_date"])
        )
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/user/{user_id}/bookings", response_model=List[BookingResponse])
def get_user_bookings(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM bookings WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for row in rows:
        results.append(BookingResponse(
            booking_id=row["booking_id"],
            user_id=row["user_id"],
            event_id=row["event_id"],
            event_type=row["event_type"],
            status=row["status"],
            booking_date=str(row["booking_date"])
        ))
    
    return results

if __name__ == "__main__":
    import uvicorn
    import sys

    # Auto-initialize DB if not exists
    if not os.path.exists(DB_NAME):
        print(f"[STARTUP] Database {DB_NAME} not found. Initializing...")
        try:
            from init_user_db import init_db
            init_db()
        except ImportError:
            # Fallback path if needed, though structure is simpler now
            print("[ERROR] Could not import init_db")
        print("[STARTUP] Database initialized successfully.")

    print("Starting User API Server...")
    port = int(os.getenv("PORT", 8001))
    print(f"Listening on 0.0.0.0:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
