import { IUser } from "@/domain/IUser"
import { Api } from "./api"


type SignResponse = {
    user: IUser;
    token: string;
}

interface IRegisterParams {
    name: string;      
    email: string;     
    password: string;  
    state?: string;     
    city?: string;      
    phone?: string;
    isTeacher: boolean;
}


export const UserService = {
    signIn: async (email: string, password: string) => {
        const response = await Api.post<SignResponse>('/users/login', { email, password });
        return response.data;
    },

    register: async (data: IRegisterParams) => {
        const response = await Api.post<IUser>('/users/register', data);
        return response.data;
    }
}