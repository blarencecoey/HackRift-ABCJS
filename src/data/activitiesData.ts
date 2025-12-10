export interface Activity {
    name: string;
    category: string;
    type: string;
    skills: string[];
    ocean: string;
    riasec: string;
}

// Sample activities combining courses and events from the Python script templates
export const ACTIVITIES: Activity[] = [
    // Tech Courses
    { name: "Python for Beginners", category: "Tech", type: "Course", skills: ["Programming", "Problem Solving", "Analytical Thinking"], ocean: "Openness", riasec: "I" },
    { name: "Python Data Science Fundamentals", category: "Tech", type: "Course", skills: ["Data Analysis", "Programming", "Statistical Analysis"], ocean: "Conscientiousness", riasec: "I" },
    { name: "Advanced Python Programming", category: "Tech", type: "Course", skills: ["Advanced Programming", "Software Design", "Problem Solving"], ocean: "Openness", riasec: "I" },
    { name: "Introduction to Web Development", category: "Tech", type: "Course", skills: ["Web Development", "HTML/CSS", "JavaScript"], ocean: "Openness", riasec: "I" },
    { name: "Full Stack Web Development Bootcamp", category: "Tech", type: "Course", skills: ["Full Stack Development", "Frontend", "Backend", "Database Design"], ocean: "Conscientiousness", riasec: "I" },
    { name: "React.js for Frontend Development", category: "Tech", type: "Course", skills: ["React", "Frontend Development", "JavaScript"], ocean: "Openness", riasec: "I" },
    { name: "Machine Learning Foundations", category: "Tech", type: "Course", skills: ["Machine Learning", "Data Science", "Python", "Algorithms"], ocean: "Openness", riasec: "I" },
    { name: "AI for Everyone", category: "Tech", type: "Course", skills: ["AI Concepts", "Technology Trends", "Critical Thinking"], ocean: "Openness", riasec: "I" },
    { name: "Cloud Computing with AWS", category: "Tech", type: "Course", skills: ["Cloud Computing", "AWS", "System Architecture"], ocean: "Conscientiousness", riasec: "I" },
    { name: "Cybersecurity Fundamentals", category: "Tech", type: "Course", skills: ["Cybersecurity", "Network Security", "Risk Management"], ocean: "Conscientiousness", riasec: "C" },

    // Business Courses
    { name: "Digital Marketing 101", category: "Business", type: "Course", skills: ["Digital Marketing", "Social Media", "Communication"], ocean: "Extraversion", riasec: "E" },
    { name: "Social Media Marketing Strategy", category: "Business", type: "Course", skills: ["Social Media Marketing", "Content Strategy", "Analytics"], ocean: "Extraversion", riasec: "E" },
    { name: "Entrepreneurship 101", category: "Business", type: "Course", skills: ["Entrepreneurship", "Business Planning", "Innovation"], ocean: "Openness", riasec: "E" },
    { name: "Project Management Professional", category: "Business", type: "Course", skills: ["Project Management", "Leadership", "Planning"], ocean: "Conscientiousness", riasec: "C" },
    { name: "Business Analytics Essentials", category: "Business", type: "Course", skills: ["Business Analysis", "Data Analytics", "Decision Making"], ocean: "Conscientiousness", riasec: "I" },
    { name: "Financial Modeling with Excel", category: "Business", type: "Course", skills: ["Financial Analysis", "Excel", "Modeling"], ocean: "Conscientiousness", riasec: "C" },

    // Arts Courses
    { name: "Graphic Design Fundamentals", category: "Arts", type: "Course", skills: ["Graphic Design", "Creativity", "Visual Communication"], ocean: "Openness", riasec: "A" },
    { name: "UI/UX Design Principles", category: "Arts", type: "Course", skills: ["UI Design", "UX Design", "User Research", "Prototyping"], ocean: "Openness", riasec: "A" },
    { name: "Adobe Photoshop Masterclass", category: "Arts", type: "Course", skills: ["Photo Editing", "Digital Art", "Creativity"], ocean: "Openness", riasec: "A" },
    { name: "Video Editing with Premiere Pro", category: "Arts", type: "Course", skills: ["Video Editing", "Storytelling", "Post-Production"], ocean: "Openness", riasec: "A" },
    { name: "Digital Photography Basics", category: "Arts", type: "Course", skills: ["Photography", "Visual Arts", "Composition"], ocean: "Openness", riasec: "A" },
    { name: "Creative Writing Workshop", category: "Arts", type: "Course", skills: ["Creative Writing", "Storytelling", "Communication"], ocean: "Openness", riasec: "A" },

    // Soft Skills Courses
    { name: "Public Speaking Masterclass", category: "Soft Skills", type: "Course", skills: ["Public Speaking", "Communication", "Confidence"], ocean: "Extraversion", riasec: "S" },
    { name: "Effective Communication Skills", category: "Soft Skills", type: "Course", skills: ["Communication", "Interpersonal Skills", "Active Listening"], ocean: "Extraversion", riasec: "S" },
    { name: "Leadership Development Program", category: "Soft Skills", type: "Course", skills: ["Leadership", "Team Management", "Decision Making"], ocean: "Extraversion", riasec: "E" },
    { name: "Emotional Intelligence at Work", category: "Soft Skills", type: "Course", skills: ["Emotional Intelligence", "Empathy", "Self-Awareness"], ocean: "Agreeableness", riasec: "S" },
    { name: "Critical Thinking and Problem Solving", category: "Soft Skills", type: "Course", skills: ["Critical Thinking", "Problem Solving", "Analytical Skills"], ocean: "Openness", riasec: "I" },
    { name: "Time Management Mastery", category: "Soft Skills", type: "Course", skills: ["Time Management", "Organization", "Productivity"], ocean: "Conscientiousness", riasec: "C" },

    // Sports Events
    { name: "Hyrox Simulation", category: "Sports", type: "Event", skills: ["Fitness", "Endurance", "Discipline"], ocean: "Conscientiousness", riasec: "R" },
    { name: "Weekend Cycling at East Coast", category: "Sports", type: "Event", skills: ["Cycling", "Fitness", "Outdoor Activities"], ocean: "Extraversion", riasec: "R" },
    { name: "Morning Yoga in the Park", category: "Sports", type: "Event", skills: ["Yoga", "Mindfulness", "Flexibility"], ocean: "Openness", riasec: "S" },
    { name: "5K Fun Run for Charity", category: "Sports", type: "Event", skills: ["Running", "Fitness", "Community Service"], ocean: "Agreeableness", riasec: "S" },
    { name: "CrossFit Challenge", category: "Sports", type: "Event", skills: ["Strength Training", "Fitness", "Discipline"], ocean: "Conscientiousness", riasec: "R" },
    { name: "Rock Climbing Indoor Session", category: "Sports", type: "Event", skills: ["Rock Climbing", "Problem Solving", "Physical Fitness"], ocean: "Openness", riasec: "R" },
    { name: "Swimming Club Meetup", category: "Sports", type: "Event", skills: ["Swimming", "Fitness", "Teamwork"], ocean: "Conscientiousness", riasec: "R" },
    { name: "Badminton Social Play", category: "Sports", type: "Event", skills: ["Badminton", "Coordination", "Social Skills"], ocean: "Extraversion", riasec: "S" },

    // Workshops
    { name: "Intro to 3D Printing", category: "Workshop", type: "Event", skills: ["3D Printing", "Technology", "Innovation"], ocean: "Openness", riasec: "I" },
    { name: "Pottery Workshop", category: "Workshop", type: "Event", skills: ["Pottery", "Craftsmanship", "Creativity"], ocean: "Openness", riasec: "A" },
    { name: "Art Jamming Session", category: "Workshop", type: "Event", skills: ["Painting", "Creativity", "Self-Expression"], ocean: "Openness", riasec: "A" },
    { name: "Candle Making Workshop", category: "Workshop", type: "Event", skills: ["Candle Making", "Craftsmanship", "Creativity"], ocean: "Openness", riasec: "A" },
    { name: "Watercolor Painting Class", category: "Workshop", type: "Event", skills: ["Watercolor", "Painting", "Artistic Expression"], ocean: "Openness", riasec: "A" },
    { name: "Cooking Class: Local Cuisine", category: "Workshop", type: "Event", skills: ["Cooking", "Culinary Arts", "Cultural Appreciation"], ocean: "Openness", riasec: "A" },
    { name: "Photography Walk", category: "Workshop", type: "Event", skills: ["Photography", "Visual Arts", "Observation"], ocean: "Openness", riasec: "A" },
    { name: "Arduino Hardware Hacking", category: "Workshop", type: "Event", skills: ["Arduino", "Electronics", "Programming", "Problem Solving"], ocean: "Openness", riasec: "I" },

    // Tech Meetups
    { name: "Luma Founder Mixer", category: "Tech Meetup", type: "Event", skills: ["Networking", "Entrepreneurship", "Communication"], ocean: "Extraversion", riasec: "E" },
    { name: "AI/ML Singapore Meetup", category: "Tech Meetup", type: "Event", skills: ["AI/ML Knowledge", "Networking", "Technology Trends"], ocean: "Openness", riasec: "I" },
    { name: "Web3 Developer Gathering", category: "Tech Meetup", type: "Event", skills: ["Web3", "Blockchain", "Networking"], ocean: "Openness", riasec: "I" },
    { name: "Startup Pitch Night", category: "Tech Meetup", type: "Event", skills: ["Pitching", "Presentation", "Entrepreneurship"], ocean: "Extraversion", riasec: "E" },
    { name: "Hackathon Weekend", category: "Tech Meetup", type: "Event", skills: ["Programming", "Teamwork", "Problem Solving", "Innovation"], ocean: "Openness", riasec: "I" },
    { name: "UX Design Critique Session", category: "Tech Meetup", type: "Event", skills: ["UX Design", "Feedback", "Design Thinking"], ocean: "Openness", riasec: "A" },

    // Social Events
    { name: "Book Club Meetup", category: "Social", type: "Event", skills: ["Reading", "Discussion", "Critical Thinking"], ocean: "Openness", riasec: "A" },
    { name: "Language Exchange Cafe", category: "Social", type: "Event", skills: ["Language Learning", "Communication", "Cultural Exchange"], ocean: "Openness", riasec: "S" },
    { name: "Board Game Night", category: "Social", type: "Event", skills: ["Strategic Thinking", "Social Skills", "Teamwork"], ocean: "Extraversion", riasec: "S" },
    { name: "Volunteer Beach Cleanup", category: "Social", type: "Event", skills: ["Community Service", "Environmental Awareness", "Teamwork"], ocean: "Agreeableness", riasec: "S" },
    { name: "Toastmasters Meeting", category: "Social", type: "Event", skills: ["Public Speaking", "Communication", "Leadership"], ocean: "Extraversion", riasec: "E" },
    { name: "Debate Club Discussion", category: "Social", type: "Event", skills: ["Debating", "Critical Thinking", "Communication"], ocean: "Openness", riasec: "E" },
    { name: "Music Jam Session", category: "Social", type: "Event", skills: ["Music", "Collaboration", "Creativity"], ocean: "Openness", riasec: "A" },
    { name: "Meditation Circle", category: "Social", type: "Event", skills: ["Meditation", "Mindfulness", "Stress Management"], ocean: "Openness", riasec: "S" }
];

export function searchActivities(query: string): Activity[] {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return [];

    return ACTIVITIES.filter(activity =>
        activity.name.toLowerCase().includes(normalized) ||
        activity.category.toLowerCase().includes(normalized) ||
        activity.skills.some(skill => skill.toLowerCase().includes(normalized))
    ).slice(0, 20);
}

export function findActivityByName(name: string): Activity | undefined {
    const normalized = name.toLowerCase().trim();
    return ACTIVITIES.find(a => a.name.toLowerCase() === normalized);
}

export function getAllActivityNames(): string[] {
    return ACTIVITIES.map(a => a.name);
}
