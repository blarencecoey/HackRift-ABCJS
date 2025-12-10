"""
Synthetic Data Generator for YUNO Recommendation App
Generates upskilling_courses.csv and holistic_events.csv with RIASEC/OCEAN mappings
"""

import pandas as pd
import numpy as np
import random
from faker import Faker
import json

fake = Faker()
Faker.seed(42)
random.seed(42)
np.random.seed(42)

# =============================================================================
# RIASEC & OCEAN MAPPINGS
# =============================================================================

RIASEC_CODES = ['R', 'I', 'A', 'S', 'E', 'C']  # Realistic, Investigative, Artistic, Social, Enterprising, Conventional
OCEAN_TRAITS = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism']
TARGET_AUDIENCES = ['Secondary', 'Post-Secondary', 'Both']

# =============================================================================
# UPSKILLING COURSES DATA (200+ items)
# =============================================================================

UPSKILLING_TEMPLATES = [
    # Tech Courses
    {"title": "Python for Beginners", "provider": "Coursera", "category": "Tech", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Python Data Science Fundamentals", "provider": "Udemy", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Advanced Python Programming", "provider": "SkillsFuture", "category": "Tech", "difficulty": "Advanced", "duration": "8 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Introduction to Web Development", "provider": "Coursera", "category": "Tech", "difficulty": "Beginner", "duration": "5 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Full Stack Web Development Bootcamp", "provider": "Udemy", "category": "Tech", "difficulty": "Advanced", "duration": "12 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "JavaScript Essentials", "provider": "Coursera", "category": "Tech", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "React.js for Frontend Development", "provider": "Udemy", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Mobile App Development with Flutter", "provider": "SkillsFuture", "category": "Tech", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "iOS Development with Swift", "provider": "Coursera", "category": "Tech", "difficulty": "Intermediate", "duration": "10 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Android Development Masterclass", "provider": "Udemy", "category": "Tech", "difficulty": "Intermediate", "duration": "10 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Machine Learning Foundations", "provider": "Coursera", "category": "Tech", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Deep Learning Specialization", "provider": "Coursera", "category": "Tech", "difficulty": "Advanced", "duration": "16 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "AI for Everyone", "provider": "Coursera", "category": "Tech", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Natural Language Processing with Python", "provider": "Udemy", "category": "Tech", "difficulty": "Advanced", "duration": "8 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Computer Vision Fundamentals", "provider": "SkillsFuture", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Cloud Computing with AWS", "provider": "Coursera", "category": "Tech", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Google Cloud Platform Essentials", "provider": "Coursera", "category": "Tech", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Microsoft Azure Fundamentals", "provider": "Udemy", "category": "Tech", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "DevOps Engineering", "provider": "SkillsFuture", "category": "Tech", "difficulty": "Advanced", "duration": "10 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Docker and Kubernetes Mastery", "provider": "Udemy", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Cybersecurity Fundamentals", "provider": "Coursera", "category": "Tech", "difficulty": "Beginner", "duration": "5 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Ethical Hacking and Penetration Testing", "provider": "Udemy", "category": "Tech", "difficulty": "Advanced", "duration": "10 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Network Security Essentials", "provider": "SkillsFuture", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Blockchain Technology Basics", "provider": "Coursera", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "SQL for Data Analysis", "provider": "Udemy", "category": "Tech", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Database Management Systems", "provider": "Coursera", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Data Engineering with Python", "provider": "SkillsFuture", "category": "Tech", "difficulty": "Advanced", "duration": "10 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Game Development with Unity", "provider": "Udemy", "category": "Tech", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Unreal Engine Game Design", "provider": "Coursera", "category": "Tech", "difficulty": "Advanced", "duration": "12 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "3D Modeling for Games", "provider": "Udemy", "category": "Tech", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    
    # Business Courses
    {"title": "Digital Marketing 101", "provider": "Coursera", "category": "Business", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "Social Media Marketing Strategy", "provider": "Udemy", "category": "Business", "difficulty": "Intermediate", "duration": "5 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "SEO Fundamentals", "provider": "SkillsFuture", "category": "Business", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Content Marketing Mastery", "provider": "Coursera", "category": "Business", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Google Ads Certification", "provider": "Coursera", "category": "Business", "difficulty": "Intermediate", "duration": "4 weeks", "riasec": "E", "ocean": "Conscientiousness"},
    {"title": "Facebook Ads for Beginners", "provider": "Udemy", "category": "Business", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "Email Marketing Strategies", "provider": "SkillsFuture", "category": "Business", "difficulty": "Beginner", "duration": "2 weeks", "riasec": "E", "ocean": "Conscientiousness"},
    {"title": "Business Analytics Essentials", "provider": "Coursera", "category": "Business", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "I", "ocean": "Conscientiousness"},
    {"title": "Financial Modeling with Excel", "provider": "Udemy", "category": "Business", "difficulty": "Intermediate", "duration": "5 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Accounting Fundamentals", "provider": "Coursera", "category": "Business", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Entrepreneurship 101", "provider": "SkillsFuture", "category": "Business", "difficulty": "Beginner", "duration": "6 weeks", "riasec": "E", "ocean": "Openness"},
    {"title": "Startup Fundraising Strategies", "provider": "Udemy", "category": "Business", "difficulty": "Advanced", "duration": "4 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "Business Plan Development", "provider": "Coursera", "category": "Business", "difficulty": "Intermediate", "duration": "5 weeks", "riasec": "E", "ocean": "Conscientiousness"},
    {"title": "Project Management Professional", "provider": "SkillsFuture", "category": "Business", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Agile and Scrum Fundamentals", "provider": "Udemy", "category": "Business", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Product Management Essentials", "provider": "Coursera", "category": "Business", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "E", "ocean": "Conscientiousness"},
    {"title": "Supply Chain Management", "provider": "SkillsFuture", "category": "Business", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "E-commerce Business Basics", "provider": "Udemy", "category": "Business", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "E", "ocean": "Openness"},
    {"title": "Dropshipping Masterclass", "provider": "Udemy", "category": "Business", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "E", "ocean": "Openness"},
    {"title": "Investment and Trading Basics", "provider": "Coursera", "category": "Business", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "E", "ocean": "Openness"},
    
    # Arts Courses
    {"title": "Graphic Design Fundamentals", "provider": "Coursera", "category": "Arts", "difficulty": "Beginner", "duration": "5 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Adobe Photoshop Masterclass", "provider": "Udemy", "category": "Arts", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Adobe Illustrator for Beginners", "provider": "Udemy", "category": "Arts", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "UI/UX Design Principles", "provider": "Coursera", "category": "Arts", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Figma for Product Design", "provider": "SkillsFuture", "category": "Arts", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Video Editing with Premiere Pro", "provider": "Udemy", "category": "Arts", "difficulty": "Intermediate", "duration": "5 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Motion Graphics with After Effects", "provider": "Coursera", "category": "Arts", "difficulty": "Advanced", "duration": "8 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Digital Photography Basics", "provider": "SkillsFuture", "category": "Arts", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Portrait Photography Masterclass", "provider": "Udemy", "category": "Arts", "difficulty": "Intermediate", "duration": "4 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Music Production with Ableton", "provider": "Coursera", "category": "Arts", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Songwriting Fundamentals", "provider": "Udemy", "category": "Arts", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Creative Writing Workshop", "provider": "SkillsFuture", "category": "Arts", "difficulty": "Beginner", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Fiction Writing Masterclass", "provider": "Coursera", "category": "Arts", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Copywriting for Marketing", "provider": "Udemy", "category": "Arts", "difficulty": "Intermediate", "duration": "4 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Animation Basics", "provider": "SkillsFuture", "category": "Arts", "difficulty": "Beginner", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "3D Animation with Blender", "provider": "Udemy", "category": "Arts", "difficulty": "Intermediate", "duration": "10 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Interior Design Principles", "provider": "Coursera", "category": "Arts", "difficulty": "Beginner", "duration": "5 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Fashion Design Basics", "provider": "SkillsFuture", "category": "Arts", "difficulty": "Beginner", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Sketching and Drawing Fundamentals", "provider": "Udemy", "category": "Arts", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "A", "ocean": "Openness"},
    {"title": "Digital Illustration Mastery", "provider": "Coursera", "category": "Arts", "difficulty": "Intermediate", "duration": "6 weeks", "riasec": "A", "ocean": "Openness"},
    
    # Soft Skills Courses
    {"title": "Public Speaking Masterclass", "provider": "Coursera", "category": "Soft Skills", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "S", "ocean": "Extraversion"},
    {"title": "Presentation Skills for Professionals", "provider": "Udemy", "category": "Soft Skills", "difficulty": "Intermediate", "duration": "3 weeks", "riasec": "S", "ocean": "Extraversion"},
    {"title": "Effective Communication Skills", "provider": "SkillsFuture", "category": "Soft Skills", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "S", "ocean": "Extraversion"},
    {"title": "Leadership Development Program", "provider": "Coursera", "category": "Soft Skills", "difficulty": "Intermediate", "duration": "8 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "Team Management Essentials", "provider": "Udemy", "category": "Soft Skills", "difficulty": "Intermediate", "duration": "5 weeks", "riasec": "E", "ocean": "Agreeableness"},
    {"title": "Conflict Resolution Strategies", "provider": "SkillsFuture", "category": "Soft Skills", "difficulty": "Intermediate", "duration": "3 weeks", "riasec": "S", "ocean": "Agreeableness"},
    {"title": "Negotiation Skills Workshop", "provider": "Coursera", "category": "Soft Skills", "difficulty": "Intermediate", "duration": "4 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "Emotional Intelligence at Work", "provider": "Udemy", "category": "Soft Skills", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "S", "ocean": "Agreeableness"},
    {"title": "Critical Thinking and Problem Solving", "provider": "Coursera", "category": "Soft Skills", "difficulty": "Intermediate", "duration": "5 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Creative Problem Solving", "provider": "SkillsFuture", "category": "Soft Skills", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "I", "ocean": "Openness"},
    {"title": "Time Management Mastery", "provider": "Udemy", "category": "Soft Skills", "difficulty": "Beginner", "duration": "2 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Productivity and Focus", "provider": "Coursera", "category": "Soft Skills", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Goal Setting and Achievement", "provider": "SkillsFuture", "category": "Soft Skills", "difficulty": "Beginner", "duration": "2 weeks", "riasec": "E", "ocean": "Conscientiousness"},
    {"title": "Mindfulness and Stress Management", "provider": "Udemy", "category": "Soft Skills", "difficulty": "Beginner", "duration": "4 weeks", "riasec": "S", "ocean": "Neuroticism"},
    {"title": "Building Resilience", "provider": "Coursera", "category": "Soft Skills", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "S", "ocean": "Neuroticism"},
    {"title": "Networking for Career Success", "provider": "SkillsFuture", "category": "Soft Skills", "difficulty": "Beginner", "duration": "2 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "Personal Branding Essentials", "provider": "Udemy", "category": "Soft Skills", "difficulty": "Beginner", "duration": "3 weeks", "riasec": "E", "ocean": "Extraversion"},
    {"title": "Interview Skills Workshop", "provider": "Coursera", "category": "Soft Skills", "difficulty": "Beginner", "duration": "2 weeks", "riasec": "S", "ocean": "Extraversion"},
    {"title": "Resume Writing Masterclass", "provider": "SkillsFuture", "category": "Soft Skills", "difficulty": "Beginner", "duration": "1 week", "riasec": "C", "ocean": "Conscientiousness"},
    {"title": "Cross-Cultural Communication", "provider": "Udemy", "category": "Soft Skills", "difficulty": "Intermediate", "duration": "4 weeks", "riasec": "S", "ocean": "Openness"},
]

# Additional variations to reach 200+
COURSE_VARIATIONS = [
    {"prefix": "Introduction to", "suffix": "", "difficulty": "Beginner"},
    {"prefix": "Advanced", "suffix": "Techniques", "difficulty": "Advanced"},
    {"prefix": "Practical", "suffix": "Workshop", "difficulty": "Intermediate"},
    {"prefix": "Complete", "suffix": "Bootcamp", "difficulty": "Intermediate"},
    {"prefix": "Professional", "suffix": "Certification", "difficulty": "Advanced"},
]

# =============================================================================
# HOLISTIC EVENTS DATA (200+ items)
# =============================================================================

HOLISTIC_TEMPLATES = [
    # Sports Events
    {"event_name": "Hyrox Simulation", "type": "Sports", "location_type": "Physical", "intensity": "High", "riasec": "R", "ocean": "Conscientiousness"},
    {"event_name": "Weekend Cycling at East Coast", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "R", "ocean": "Extraversion"},
    {"event_name": "Morning Yoga in the Park", "type": "Sports", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Openness"},
    {"event_name": "5K Fun Run for Charity", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "S", "ocean": "Agreeableness"},
    {"event_name": "CrossFit Challenge", "type": "Sports", "location_type": "Physical", "intensity": "High", "riasec": "R", "ocean": "Conscientiousness"},
    {"event_name": "Beach Volleyball Tournament", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "S", "ocean": "Extraversion"},
    {"event_name": "Rock Climbing Indoor Session", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "R", "ocean": "Openness"},
    {"event_name": "Swimming Club Meetup", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "R", "ocean": "Conscientiousness"},
    {"event_name": "Badminton Social Play", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "S", "ocean": "Extraversion"},
    {"event_name": "Tennis Beginners Clinic", "type": "Sports", "location_type": "Physical", "intensity": "Low", "riasec": "R", "ocean": "Openness"},
    {"event_name": "Football Pickup Game", "type": "Sports", "location_type": "Physical", "intensity": "High", "riasec": "S", "ocean": "Extraversion"},
    {"event_name": "Basketball 3v3 Tournament", "type": "Sports", "location_type": "Physical", "intensity": "High", "riasec": "S", "ocean": "Extraversion"},
    {"event_name": "Martial Arts Trial Class", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "R", "ocean": "Conscientiousness"},
    {"event_name": "Dance Fitness Workshop", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "A", "ocean": "Extraversion"},
    {"event_name": "Pilates for Beginners", "type": "Sports", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Conscientiousness"},
    {"event_name": "HIIT Bootcamp", "type": "Sports", "location_type": "Physical", "intensity": "High", "riasec": "R", "ocean": "Conscientiousness"},
    {"event_name": "Kayaking Adventure", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "R", "ocean": "Openness"},
    {"event_name": "Hiking at MacRitchie Reservoir", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "R", "ocean": "Openness"},
    {"event_name": "Skateboarding Basics", "type": "Sports", "location_type": "Physical", "intensity": "Medium", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Golf Introduction Session", "type": "Sports", "location_type": "Physical", "intensity": "Low", "riasec": "C", "ocean": "Conscientiousness"},
    
    # Workshops
    {"event_name": "Intro to 3D Printing", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Pottery Workshop", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Art Jamming Session", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Candle Making Workshop", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Leather Crafting Basics", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "R", "ocean": "Openness"},
    {"event_name": "Watercolor Painting Class", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Calligraphy for Beginners", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "DIY Terrarium Workshop", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Cooking Class: Local Cuisine", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Baking Workshop: Artisan Bread", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Coffee Brewing Masterclass", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Photography Walk", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Arduino Hardware Hacking", "type": "Workshop", "location_type": "Physical", "intensity": "Medium", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Raspberry Pi Project Workshop", "type": "Workshop", "location_type": "Physical", "intensity": "Medium", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Drone Building Workshop", "type": "Workshop", "location_type": "Physical", "intensity": "Medium", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Robotics Introduction", "type": "Workshop", "location_type": "Physical", "intensity": "Medium", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Jewelry Making Class", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Soap Making Workshop", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Perfume Crafting Session", "type": "Workshop", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Woodworking Basics", "type": "Workshop", "location_type": "Physical", "intensity": "Medium", "riasec": "R", "ocean": "Openness"},
    
    # Tech Meetups
    {"event_name": "Luma Founder Mixer", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "E", "ocean": "Extraversion"},
    {"event_name": "AI/ML Singapore Meetup", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Web3 Developer Gathering", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Startup Pitch Night", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Medium", "riasec": "E", "ocean": "Extraversion"},
    {"event_name": "Product Hunt Singapore Launch", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "E", "ocean": "Extraversion"},
    {"event_name": "Women in Tech Networking", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Extraversion"},
    {"event_name": "Hackathon Weekend", "type": "Tech Meetup", "location_type": "Physical", "intensity": "High", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Data Science Community Meetup", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Openness"},
    {"event_name": "UX Design Critique Session", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "DevOps Community Gathering", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Conscientiousness"},
    {"event_name": "Cybersecurity Talk", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Conscientiousness"},
    {"event_name": "Cloud Computing Roundtable", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Conscientiousness"},
    {"event_name": "Mobile Dev Community Meetup", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Gaming Industry Networking", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Extraversion"},
    {"event_name": "Fintech Innovation Talk", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "E", "ocean": "Openness"},
    {"event_name": "EdTech Innovators Meetup", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Openness"},
    {"event_name": "HealthTech Discussion Panel", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Agreeableness"},
    {"event_name": "CleanTech Networking Event", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Agreeableness"},
    {"event_name": "Virtual Reality Demo Night", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Openness"},
    {"event_name": "Blockchain Coffee Chat", "type": "Tech Meetup", "location_type": "Physical", "intensity": "Low", "riasec": "I", "ocean": "Openness"},
    
    # Social Events
    {"event_name": "Book Club Meetup", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Language Exchange Cafe", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Openness"},
    {"event_name": "Board Game Night", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Extraversion"},
    {"event_name": "Movie Appreciation Club", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Volunteer Beach Cleanup", "type": "Social", "location_type": "Physical", "intensity": "Medium", "riasec": "S", "ocean": "Agreeableness"},
    {"event_name": "Community Garden Day", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "R", "ocean": "Agreeableness"},
    {"event_name": "Toastmasters Meeting", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "E", "ocean": "Extraversion"},
    {"event_name": "Debate Club Discussion", "type": "Social", "location_type": "Physical", "intensity": "Medium", "riasec": "E", "ocean": "Openness"},
    {"event_name": "Poetry Open Mic Night", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Stand-up Comedy Open Mic", "type": "Social", "location_type": "Physical", "intensity": "Medium", "riasec": "A", "ocean": "Extraversion"},
    {"event_name": "Music Jam Session", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Karaoke Night", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Extraversion"},
    {"event_name": "Cultural Heritage Tour", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Food Tour: Hawker Centers", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Openness"},
    {"event_name": "Wine Tasting Evening", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Tea Appreciation Session", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "A", "ocean": "Openness"},
    {"event_name": "Speed Friending Event", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Extraversion"},
    {"event_name": "Networking Brunch", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "E", "ocean": "Extraversion"},
    {"event_name": "Meditation Circle", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Openness"},
    {"event_name": "Mental Wellness Support Group", "type": "Social", "location_type": "Physical", "intensity": "Low", "riasec": "S", "ocean": "Agreeableness"},
]

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def generate_course_description(title: str, category: str, difficulty: str, provider: str) -> str:
    """Generate realistic course descriptions based on title and category."""
    
    templates = {
        "Tech": [
            f"Master {title.lower()} with hands-on projects and real-world applications. This {difficulty.lower()} course from {provider} covers essential concepts and practical skills needed in today's tech industry.",
            f"Learn {title.lower()} through interactive exercises and industry-relevant projects. Perfect for students looking to build technical skills for the digital economy.",
            f"Comprehensive {difficulty.lower()}-level training in {title.lower()}. Gain practical experience with tools and technologies used by professionals in Singapore and globally.",
        ],
        "Business": [
            f"Develop essential business skills with {title}. This {difficulty.lower()} course teaches practical strategies for success in Singapore's competitive business environment.",
            f"Build your career foundation with {title.lower()}. Learn from industry experts and gain actionable skills for the modern workplace.",
            f"Transform your business acumen with this {difficulty.lower()} course on {title.lower()}. Ideal for aspiring entrepreneurs and future business leaders.",
        ],
        "Arts": [
            f"Unleash your creativity with {title}. This {difficulty.lower()} course guides you through artistic techniques and creative expression.",
            f"Explore the world of {title.lower()} with expert guidance. Perfect for creative individuals looking to develop their artistic abilities.",
            f"Express yourself through {title.lower()}. This hands-on course from {provider} nurtures creativity and builds practical artistic skills.",
        ],
        "Soft Skills": [
            f"Enhance your personal and professional development with {title}. Build essential skills for career success and personal growth.",
            f"Develop crucial soft skills with this {difficulty.lower()} course on {title.lower()}. Essential training for students preparing for the workforce.",
            f"Master {title.lower()} and boost your confidence in professional settings. Great for building interpersonal skills valued by employers.",
        ],
    }
    
    return random.choice(templates.get(category, templates["Tech"]))


def generate_event_description(event_name: str, event_type: str, intensity: str, location_type: str) -> str:
    """Generate realistic event descriptions based on event details."""
    
    templates = {
        "Sports": [
            f"Join us for {event_name}! A {intensity.lower()}-intensity {location_type.lower()} activity perfect for staying active and meeting like-minded fitness enthusiasts in Singapore.",
            f"Get moving with {event_name}. This {intensity.lower()}-intensity session is ideal for students looking to stay fit while having fun.",
            f"Challenge yourself at {event_name}. Connect with others who share your passion for fitness and healthy living.",
        ],
        "Workshop": [
            f"Discover the art of {event_name.lower().replace('workshop', '').replace('class', '').strip()}. This hands-on workshop teaches practical skills in a relaxed, creative environment.",
            f"Learn something new at our {event_name}. Perfect for curious minds looking to explore new hobbies and develop creative skills.",
            f"Join this engaging {event_name.lower()} and walk away with new skills and creations. Suitable for beginners and enthusiasts alike.",
        ],
        "Tech Meetup": [
            f"Connect with Singapore's tech community at {event_name}. Network with innovators, share ideas, and stay updated on the latest trends.",
            f"Join fellow tech enthusiasts at {event_name}. Great opportunity to learn, network, and explore career opportunities in tech.",
            f"Be part of {event_name} and engage with industry professionals. Perfect for students interested in technology and innovation.",
        ],
        "Social": [
            f"Expand your social circle at {event_name}. Meet people with shared interests in a friendly, welcoming atmosphere.",
            f"Looking to connect? Join {event_name} and enjoy meaningful conversations with like-minded individuals.",
            f"Experience {event_name} and build lasting friendships. A great way to unwind, learn, and connect with your community.",
        ],
    }
    
    return random.choice(templates.get(event_type, templates["Social"]))


def create_embedding_text(row: dict, is_course: bool = True) -> str:
    """Create embedding text by concatenating relevant fields."""
    
    if is_course:
        personality_tags = f"RIASEC: {row['primary_riasec']}. OCEAN Focus: {row['ocean_trait_focus']}."
        return f"{row['title']}. {row['provider']}. {row['category']}. {row['description']} {personality_tags}"
    else:
        personality_tags = f"RIASEC: {row['primary_riasec']}. OCEAN Focus: {row['ocean_trait_focus']}."
        return f"{row['event_name']}. {row['type']}. {row['description']} {personality_tags}"


# =============================================================================
# DATA GENERATION FUNCTIONS
# =============================================================================

def generate_upskilling_data(n_samples: int = 200) -> pd.DataFrame:
    """Generate upskilling courses dataset."""
    
    data = []
    course_id = 1
    
    # First, add all base templates
    for template in UPSKILLING_TEMPLATES:
        audience = random.choice(TARGET_AUDIENCES)
        description = generate_course_description(
            template["title"], 
            template["category"], 
            template["difficulty"],
            template["provider"]
        )
        
        row = {
            "id": f"COURSE_{course_id:04d}",
            "title": template["title"],
            "provider": template["provider"],
            "category": template["category"],
            "difficulty": template["difficulty"],
            "duration": template["duration"],
            "target_audience": audience,
            "primary_riasec": template["riasec"],
            "ocean_trait_focus": template["ocean"],
            "description": description,
        }
        row["embedding_text"] = create_embedding_text(row, is_course=True)
        data.append(row)
        course_id += 1
    
    # Generate variations to reach n_samples
    base_topics = [
        ("Data Visualization", "Tech", "I", "Openness"),
        ("Excel for Business", "Business", "C", "Conscientiousness"),
        ("Presentation Design", "Arts", "A", "Openness"),
        ("Networking Skills", "Soft Skills", "E", "Extraversion"),
        ("API Development", "Tech", "I", "Conscientiousness"),
        ("Brand Strategy", "Business", "E", "Openness"),
        ("Video Production", "Arts", "A", "Openness"),
        ("Active Listening", "Soft Skills", "S", "Agreeableness"),
        ("Testing and QA", "Tech", "C", "Conscientiousness"),
        ("Sales Fundamentals", "Business", "E", "Extraversion"),
    ]
    
    providers = ["Coursera", "Udemy", "SkillsFuture", "Local Poly", "NUS Extension", "SMU Academy"]
    durations = ["2 weeks", "3 weeks", "4 weeks", "5 weeks", "6 weeks", "8 weeks", "10 weeks", "12 weeks"]
    
    while len(data) < n_samples:
        topic, category, riasec, ocean = random.choice(base_topics)
        variation = random.choice(COURSE_VARIATIONS)
        provider = random.choice(providers)
        
        title = f"{variation['prefix']} {topic} {variation['suffix']}".strip()
        difficulty = variation["difficulty"]
        audience = random.choice(TARGET_AUDIENCES)
        duration = random.choice(durations)
        
        description = generate_course_description(title, category, difficulty, provider)
        
        row = {
            "id": f"COURSE_{course_id:04d}",
            "title": title,
            "provider": provider,
            "category": category,
            "difficulty": difficulty,
            "duration": duration,
            "target_audience": audience,
            "primary_riasec": riasec,
            "ocean_trait_focus": ocean,
            "description": description,
        }
        row["embedding_text"] = create_embedding_text(row, is_course=True)
        data.append(row)
        course_id += 1
    
    return pd.DataFrame(data)


def generate_holistic_data(n_samples: int = 200) -> pd.DataFrame:
    """Generate holistic events dataset."""
    
    data = []
    event_id = 1
    
    # First, add all base templates
    for template in HOLISTIC_TEMPLATES:
        audience = random.choice(TARGET_AUDIENCES)
        description = generate_event_description(
            template["event_name"],
            template["type"],
            template["intensity"],
            template["location_type"]
        )
        
        row = {
            "id": f"EVENT_{event_id:04d}",
            "event_name": template["event_name"],
            "type": template["type"],
            "location_type": template["location_type"],
            "intensity": template["intensity"],
            "target_audience": audience,
            "primary_riasec": template["riasec"],
            "ocean_trait_focus": template["ocean"],
            "description": description,
        }
        row["embedding_text"] = create_embedding_text(row, is_course=False)
        data.append(row)
        event_id += 1
    
    # Generate variations to reach n_samples
    additional_events = [
        ("Sunrise Cycling", "Sports", "Physical", "Medium", "R", "Conscientiousness"),
        ("Sunset Yoga", "Sports", "Physical", "Low", "S", "Openness"),
        ("Indoor Bouldering", "Sports", "Physical", "Medium", "R", "Openness"),
        ("Pottery Basics", "Workshop", "Physical", "Low", "A", "Openness"),
        ("Digital Art Session", "Workshop", "Online", "Low", "A", "Openness"),
        ("Startup Coffee Chat", "Tech Meetup", "Physical", "Low", "E", "Extraversion"),
        ("Coding Dojo", "Tech Meetup", "Physical", "Medium", "I", "Openness"),
        ("Philosophy Discussion", "Social", "Physical", "Low", "I", "Openness"),
        ("Photography Walkabout", "Workshop", "Physical", "Low", "A", "Openness"),
        ("Improv Comedy", "Social", "Physical", "Medium", "A", "Extraversion"),
    ]
    
    locations = ["Marina Bay", "Orchard", "Jurong", "Tampines", "Woodlands", "Sentosa", "Online"]
    
    while len(data) < n_samples:
        event_name, event_type, loc_type, intensity, riasec, ocean = random.choice(additional_events)
        
        # Add location variation
        if loc_type == "Physical":
            location = random.choice([l for l in locations if l != "Online"])
            event_name_full = f"{event_name} @ {location}"
        else:
            event_name_full = f"{event_name} (Virtual)"
        
        audience = random.choice(TARGET_AUDIENCES)
        description = generate_event_description(event_name_full, event_type, intensity, loc_type)
        
        row = {
            "id": f"EVENT_{event_id:04d}",
            "event_name": event_name_full,
            "type": event_type,
            "location_type": loc_type,
            "intensity": intensity,
            "target_audience": audience,
            "primary_riasec": riasec,
            "ocean_trait_focus": ocean,
            "description": description,
        }
        row["embedding_text"] = create_embedding_text(row, is_course=False)
        data.append(row)
        event_id += 1
    
    return pd.DataFrame(data)


# =============================================================================
# MAIN EXECUTION
# =============================================================================

if __name__ == "__main__":
    print("=" * 60)
    print("YUNO Synthetic Data Generator")
    print("=" * 60)
    
    # Generate upskilling courses
    print("\n[1/4] Generating upskilling courses dataset...")
    upskilling_df = generate_upskilling_data(n_samples=200)
    print(f"      Generated {len(upskilling_df)} courses")
    
    # Generate holistic events
    print("\n[2/4] Generating holistic events dataset...")
    holistic_df = generate_holistic_data(n_samples=200)
    print(f"      Generated {len(holistic_df)} events")
    
    # Save to CSV
    print("\n[3/4] Saving datasets to CSV...")
    upskilling_df.to_csv("upskilling_courses.csv", index=False)
    holistic_df.to_csv("holistic_events.csv", index=False)
    print("      Saved: upskilling_courses.csv")
    print("      Saved: holistic_events.csv")
    
    # Preview data
    print("\n[4/4] Preview of generated data:")
    print("\n" + "=" * 60)
    print("UPSKILLING COURSES (First 5 rows)")
    print("=" * 60)
    print(upskilling_df[["id", "title", "provider", "category", "target_audience", "primary_riasec"]].head())
    
    print("\n" + "=" * 60)
    print("HOLISTIC EVENTS (First 5 rows)")
    print("=" * 60)
    print(holistic_df[["id", "event_name", "type", "intensity", "target_audience", "primary_riasec"]].head())
    
    print("\n" + "=" * 60)
    print("Generation Complete!")
    print("=" * 60)
