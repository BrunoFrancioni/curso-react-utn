import { createContext } from "react";

export interface User {
    uid?: string;
    name_lastname?: string;
    email?: string;
}

export interface IUserContext {
    user?: User;
    setUser?: any;
}

export const UserContext = createContext<IUserContext>({});