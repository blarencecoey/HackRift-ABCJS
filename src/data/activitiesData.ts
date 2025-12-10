import coursesRaw from "../../course_activity_1.csv?raw";

export interface Activity {
    name: string;
    type: string;
    category: string;
    skills: string[];
    riasec: string;
    ocean: string;
}

let parsedActivities: Activity[] | null = null;

function parseCSV(csv: string): Activity[] {
    const lines = csv.trim().split("\n");
    const activities: Activity[] = [];

    // Skip header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // Handle quoted fields with commas
        const fields: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
                fields.push(current.trim());
                current = "";
            } else {
                current += char;
            }
        }
        fields.push(current.trim());

        // CSV format: activity_name,type,category,skills,primary_riasec,ocean_trait_focus
        if (fields.length >= 6) {
            activities.push({
                name: fields[0].replace(/^"|"$/g, ''), // Remove quotes
                type: fields[1].replace(/^"|"$/g, ''),
                category: fields[2].replace(/^"|"$/g, ''),
                skills: fields[3].replace(/^"|"$/g, '').split(",").map(s => s.trim()).filter(Boolean),
                riasec: fields[4].replace(/^"|"$/g, ''),
                ocean: fields[5].replace(/^"|"$/g, ''),
            });
        }
    }

    return activities;
}

export function getActivities(): Activity[] {
    if (!parsedActivities) {
        parsedActivities = parseCSV(coursesRaw);
    }
    return parsedActivities;
}

export function findActivityByName(name: string): Activity | undefined {
    const activities = getActivities();
    const normalized = name.toLowerCase().trim();
    return activities.find(a => a.name.toLowerCase() === normalized);
}

export function searchActivities(query: string): Activity[] {
    const activities = getActivities();
    const normalized = query.toLowerCase().trim();
    if (!normalized) return [];

    return activities.filter(a =>
        a.name.toLowerCase().includes(normalized) ||
        a.category.toLowerCase().includes(normalized)
    ).slice(0, 10);
}

export function getAllActivityNames(): string[] {
    return getActivities().map(a => a.name);
}
