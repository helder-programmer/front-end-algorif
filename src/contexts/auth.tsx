import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";

import { IUser } from "@/domain/IUser";
import { UserService } from "@/services/auth";

interface IAuthContext {
    signIn(email: string, password: string): Promise<void>;
    logout(): void;
    user: IUser | null;
    isAuthneticated: boolean;
    setUser: Dispatch<SetStateAction<IUser | null>>;

}


export const AuthContext = createContext({} as IAuthContext);


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const isAuthneticated = !!user;


    const signIn = async (email: string, password: string) => {
        const { user, token } = await UserService.signIn(email, password);

        setCookie(undefined, 'algorif-token', token, {
            maxAge: 60 * 60 * 1, //1hour
            path: '/'
        });

        setUser(user);
        console.log(token);
        Router.reload();
    }


    const logout = () => {
        setUser(null);
        destroyCookie(undefined, 'algorif-cookie');
        Router.reload();
    }


    return (
        <AuthContext.Provider value={{ signIn, logout, user, isAuthneticated, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}



export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
}

