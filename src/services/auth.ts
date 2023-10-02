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

interface IUpdateParams {
    name: string;
    email: string;
    state?: string;
    city?: string;
    phone?: string;
}


export const AuthService = {
    signIn: async (email: string, password: string) => {
        const response = await Api.post<SignResponse>('/users/login', { email, password });
        return response.data;
    },

    register: async (data: IRegisterParams) => {
        const response = await Api.post<IUser>('/users/register', data);
        return response.data;
    },
    recoverUserInformations: async () => {
        const response = await Api.get<IUser>('/users/recoverUserInformations');
        return response.data;
    },

    update: async (data: IUpdateParams) =>  {
        const response = await Api.put<IUser>('/users', data);
        return response.data;
    }
}