import sqlite3
import json
import random
import bcrypt
from faker import Faker

# Configuration
DB_NAME = "users.db"
NUM_USERS = 15
DEFAULT_PASSWORD = "password123"

# Initialize Faker
fake = Faker()

def init_db():
    """Initialize the database with tables and synthetic data."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    print("--- Initializing Database ---")

    # 1. Create Tables
    # Drop existing tables to ensure a fresh start
    cursor.execute("DROP TABLE IF EXISTS bookings")
    cursor.execute("DROP TABLE IF EXISTS user_profiles")
    cursor.execute("DROP TABLE IF EXISTS users")

    # Table: users
    cursor.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            education_level TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Table: user_profiles
    cursor.execute("""
        CREATE TABLE user_profiles (
            user_id INTEGER PRIMARY KEY,
            riasec_code TEXT NOT NULL,
            ocean_scores TEXT NOT NULL, -- Stored as JSON string
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)

    # Table: bookings
    cursor.execute("""
        CREATE TABLE bookings (
            booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            event_id TEXT NOT NULL,
            event_type TEXT NOT NULL, -- 'course' or 'event'
            status TEXT DEFAULT 'confirmed',
            booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)

    print("Tables created successfully.")

    # 2. Generate Synthetic Users
    print(f"Generating {NUM_USERS} synthetic users...")
    
    # Hash the default password using bcrypt directly
    # Encode password to bytes, hash, then decode back to string for storage
    hashed_password_bytes = bcrypt.hashpw(DEFAULT_PASSWORD.encode('utf-8'), bcrypt.gensalt())
    hashed_password = hashed_password_bytes.decode('utf-8')

    riasec_letters = ['R', 'I', 'A', 'S', 'E', 'C']
    education_levels = ["Secondary", "Post-Secondary"]

    for _ in range(NUM_USERS):
        # User Data
        profile = fake.simple_profile()
        username = profile['username']
        # Ensure unique usernames (simple retry logic could be added, but faker is usually diverse enough for 15)
        
        education = random.choice(education_levels)
        
        # Insert into users
        cursor.execute("""
            INSERT INTO users (username, password_hash, education_level)
            VALUES (?, ?, ?)
        """, (username, hashed_password, education))
        
        new_user_id = cursor.lastrowid

        # Profile Data
        # Random 3-letter RIASEC code
        riasec_code = "".join(random.sample(riasec_letters, 3))
        
        # Random OCEAN scores
        ocean_scores = {
            "Openness": random.randint(1, 100),
            "Conscientiousness": random.randint(1, 100),
            "Extraversion": random.randint(1, 100),
            "Agreeableness": random.randint(1, 100),
            "Neuroticism": random.randint(1, 100)
        }
        
        # Insert into user_profiles
        cursor.execute("""
            INSERT INTO user_profiles (user_id, riasec_code, ocean_scores)
            VALUES (?, ?, ?)
        """, (new_user_id, riasec_code, json.dumps(ocean_scores)))

    conn.commit()
    print("Synthetic data inserted.")

    # 3. Verification
    print("\n--- Verification: First 3 Users ---")
    cursor.execute("""
        SELECT u.id, u.username, u.education_level, p.riasec_code, p.ocean_scores
        FROM users u
        JOIN user_profiles p ON u.id = p.user_id
        LIMIT 3
    """)
    
    rows = cursor.fetchall()
    for row in rows:
        print(f"ID: {row[0]} | User: {row[1]} | Edu: {row[2]} | RIASEC: {row[3]} | OCEAN: {row[4]}")

    conn.close()
    print("\nDatabase initialization complete. File: users.db")

if __name__ == "__main__":
    init_db()
