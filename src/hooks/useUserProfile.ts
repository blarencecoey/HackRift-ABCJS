import { useState, useCallback } from 'react';
import { Activity } from '../data/activitiesData';
import { getSkillsFromActivity } from '../data/skillMappings';

export interface UserActivity extends Activity {
    activityId: string;
}

export interface SkillCount {
    skill: string;
    count: number;
}

export function useUserProfile() {
    const [completedActivities, setCompletedActivities] = useState<UserActivity[]>([]);
    const [skillCounts, setSkillCounts] = useState<Map<string, number>>(new Map());

    const addActivity = useCallback((activity: Activity): boolean => {
        // Check if activity already exists
        const exists = completedActivities.some(a => a.name === activity.name);
        if (exists) {
            return false;
        }

        const activityId = `${activity.name}-${Date.now()}`;
        const userActivity: UserActivity = { ...activity, activityId };

        // Extract skills and update counts
        const skills = getSkillsFromActivity(activity);
        const newSkillCounts = new Map(skillCounts);
        skills.forEach(skill => {
            newSkillCounts.set(skill, (newSkillCounts.get(skill) || 0) + 1);
        });

        setCompletedActivities(prev => [...prev, userActivity]);
        setSkillCounts(newSkillCounts);
        return true;
    }, [completedActivities, skillCounts]);

    const removeActivity = useCallback((activityId: string): boolean => {
        const activity = completedActivities.find(a => a.activityId === activityId);
        if (!activity) {
            return false;
        }

        // Extract skills and decrement counts
        const skills = getSkillsFromActivity(activity);
        const newSkillCounts = new Map(skillCounts);
        skills.forEach(skill => {
            const currentCount = newSkillCounts.get(skill) || 0;
            if (currentCount <= 1) {
                newSkillCounts.delete(skill);
            } else {
                newSkillCounts.set(skill, currentCount - 1);
            }
        });

        setCompletedActivities(prev => prev.filter(a => a.activityId !== activityId));
        setSkillCounts(newSkillCounts);
        return true;
    }, [completedActivities, skillCounts]);

    const getTopSkills = useCallback((limit: number = 10): SkillCount[] => {
        const skillArray = Array.from(skillCounts.entries()).map(([skill, count]) => ({
            skill,
            count
        }));

        return skillArray
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }, [skillCounts]);

    return {
        completedActivities,
        addActivity,
        removeActivity,
        getTopSkills
    };
}
