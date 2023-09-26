export interface IUser {
    userId: string;    
    name: string;      
    email: string;     
    password: string;  
    state?: string;     
    city?: string;      
    phone?: string;     
    score: number;     
    isTeacher: boolean; 
    createdAt: Date; 
    updatedAt: Date; 
    classId_?: string;
}