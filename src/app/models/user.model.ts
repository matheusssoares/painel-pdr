export interface UserModel {
    objectId: string;
    emailVerified: boolean;
    email: string;
    name: string;
    password: string;
    image: string;
    username: string;
    status: boolean;
    uidFirebase: string;
    whatsApp: string;
    profileImage: File;
    userType: string;
    sessionToken: string;
}