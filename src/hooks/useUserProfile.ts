import { useState } from 'react';
import { Activity } from '../data/activitiesData';
import { getSkillsFromActivity } from '../data/skillMappings';

export interface UserActivity {
    activity: Activity;
    dateAdded: Date;
}

export interface SkillCount {
    skill: string;
    count: number;
}

export function useUserProfile() {
    const [completedActivities, setCompletedActivities] = useState<UserActivity[]>([]);
    const [skillsMap, setSkillsMap] = useState<Map<string, number>>(new Map());

    const addActivity = (activity: Activity): boolean => {
        // Check for duplicates
        const exists = completedActivities.some(
            ua => ua.activity.name.toLowerCase() === activity.name.toLowerCase()
        );

        if (exists) {
            return false;
        }

        // Add activity
        const userActivity: UserActivity = {
            activity,
            dateAdded: new Date()
        };

        setCompletedActivities(prev => [...prev, userActivity]);

        // Update skills count
        const skills = getSkillsFromActivity(activity);
        setSkillsMap(prev => {
            const newMap = new Map(prev);
            skills.forEach(skill => {
                newMap.set(skill, (newMap.get(skill) || 0) + 1);
            });
            return newMap;
        });

        return true;
    };

    const removeActivity = (activityName: string): boolean => {
        const activityToRemove = completedActivities.find(
            ua => ua.activity.name === activityName
        );

        if (!activityToRemove) {
            return false;
        }

        // Remove activity
        setCompletedActivities(prev =>
            prev.filter(ua => ua.activity.name !== activityName)
        );

        // Update skills count
        const skills = getSkillsFromActivity(activityToRemove.activity);
        setSkillsMap(prev => {
            const newMap = new Map(prev);
            skills.forEach(skill => {
                const currentCount = newMap.get(skill) || 0;
                if (currentCount <= 1) {
                    newMap.delete(skill);
                } else {
                    newMap.set(skill, currentCount - 1);
                }
            });
            return newMap;
        });

        return true;
    };

    const getTopSkills = (limit: number = 10): SkillCount[] => {
        return Array.from(skillsMap.entries())
            .map(([skill, count]) => ({ skill, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    };

    return {
        completedActivities,
        addActivity,
        removeActivity,
        getTopSkills
    };
}
