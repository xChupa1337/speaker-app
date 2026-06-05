export interface User {
    _id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    isVerified: boolean;
    name: string;
    progress: any[];
    avatarUri?: string;
    country?: string;
    level?: string;
}
