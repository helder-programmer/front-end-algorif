import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";

import { AuthService } from "@/services/auth";
import { IUser } from "@/domain/IUser";

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


    useEffect(() => {
        const { 'algorif-token': token } = parseCookies();


        if (token) {
            AuthService.recoverUserInformations().then(user => {
                setUser(user);
                console.log(user);
            }).catch(err => {
                console.log('Invalid Token');
            })
        }
    }, []);


    const signIn = async (email: string, password: string) => {
        const { user, token } = await AuthService.signIn(email, password);

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
        destroyCookie({}, 'algorif-token', {
            path: '/'
        })
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

