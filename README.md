# YUNO - Personal Growth & Community Platform

YUNO is a mobile-responsive web application designed to help users discover their potential through personality assessments, skill tracking, and community connections. It features a modern, clean UI and personalized recommendations for courses and events.

[![YUNO](src/assets/YUNO.png)](https://devpost.com/software/project-yuno)
## 🚀 Key Features

*   **Personality Assessment**: Interactive onboarding flow to determine OCEAN and RIASEC scores.
*   **Home Dashboard**: 
    *   **Today's Plan**: Tracks bookings and daily activities.
    *   **Skill Tracking**: Visualizes top skills (Adaptability, Problem Solving, etc.).
    *   **Heart-Triggered Booking**: Seamlessly book events directly from the dashboard.
*   **Community Discovery**: 
    *   **"Grow" & "Connect" Tabs**: Switch between upskilling courses vs. holistic/social events.
    *   **Smart Search**: Full-text search with real-time feedback.
    *   **Match Scores**: AI-driven compatibility scores for communities.
*   **Reflection**: Mood check-ins, daily journaling, and calendar tracking.
*   **Profile**: Detailed user statistics and growth history.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Icons)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)

### Backend Services
The backend is split into two microservices built with **Python** & **FastAPI**:

1.  **Auth & User Service** (`api/user_auth`)
    *   Handles User Registration/Login (JWT/Session based).
    *   Manages User Profile (OCEAN scores, Education level).
    *   Bookings & Schedule Management.
    *   Database: SQLite (`users.db`).

2.  **Recommendation Service** (`api/rec_service`)
    *   Provides personalized recommendations ("Upskilling" vs "Holistic").
    *   Uses Vector Search for matching user queries to communities.
    *   Database: Local Vector DB.

## 📦 Installation & Setup

### Option 1: Docker (Recommended)
You can spin up the entire stack using Docker Compose.

```bash
# Build and start all services
docker-compose up --build
```

Access the application:
*   **Frontend**: http://localhost:3000
*   **Rec Service**: http://localhost:8000
*   **Auth Service**: http://localhost:8001

### Option 2: Manual Setup

#### 1. Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### 2. Auth Service
```bash
cd api/user_auth
# Install Python dependencies (ensure you have python/pip)
pip install fastapi uvicorn sqlite3 pydantic bcrypt 

# Run the service
python user_api.py
```
*Runs on http://localhost:8001*

#### 3. Recommendation Service
```bash
cd api/rec_service
# Install Python dependencies
pip install -r requirements.txt
# (Typical deps: fastapi uvicorn sentence-transformers chromadb/faiss etc.)

# Run the service
uvicorn app:app --reload --port 8000
```
*Runs on http://localhost:8000*

## 📂 Project Structure

```
├── src/                # Frontend Source
│   ├── components/     # React Components (Home, Discovery, Profile...)
│   ├── hooks/          # Custom React Hooks
│   ├── App.tsx         # Main Routing & Layout
│   └── ...
├── api/                # Backend Source
│   ├── user_auth/      # User & Booking API (FastAPI + SQLite)
│   └── rec_service/    # Recommendation Engine (FastAPI + Vector DB)
├── public/             # Static Assets
├── docker-compose.yml  # Docker Orchestration
└── ...
```

## 🎨 Design System

*   **Colors**: 
    *   Primary Background: Warm Beige/Cream (`#F5F0EB`)
    *   Active/Accent: Gold/Amber (`#D4A574`) and Teal (`#7EB8B3`)
    *   Text: Dark Gray (`#4A5568`)
*   **Typography**: Clean sans-serif (Inter/Plus Jakarta Sans).
*   **Components**: Rounded corners (`rounded-2xl`, `rounded-3xl`) and soft shadows for a modern, accessible feel.

## 🤝 Contribution

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
