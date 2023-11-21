export interface User {
    gender: string;
    firstName: string;
    lastName: string;
    photoUrl: string; 
}

export interface UserData {
    data: User[];
}