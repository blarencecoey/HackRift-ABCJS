import { Activity } from './activitiesData';

export function getSkillsFromActivity(activity: Activity): string[] {
    return activity.skills || [];
}
