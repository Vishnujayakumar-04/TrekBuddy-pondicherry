import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: Timestamp;
    preferences: {
        language: string;
        theme: string;
    };
    savedPlaces: string[];
    visitedPlaces: string[];
    phone?: string;
    dob?: string;
    gender?: 'Male' | 'Female' | 'Other' | string;
}
