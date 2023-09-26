import { IUser } from "@/domain/IUser"
import { Api } from "./api"


type SignResponse = {
    user: IUser;
    token: string;
}

interface IRegisterParams {
}


export const UserService = {
    signIn: async (email: string, password: string) => {
        const response = await Api.post<SignResponse>('/users/login', { email, password });
        return response;
    },



}