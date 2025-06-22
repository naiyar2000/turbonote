import {  StateCreator } from "zustand";
import { PortfolioStore } from "./rootStore";

export type UserStoreType = {
    user?: {
        createdAt: string;
        email: string;
        id?: string;
        name: string;
        image: string;
        updatedAt: string;
    },
    setUser: (user: UserStoreType['user']) => void;
}


export const createUserSlice: StateCreator<
    PortfolioStore,
    [['zustand/devtools', never]],
    [],
    UserStoreType
> = (set) => ({
    user: undefined,
    setUser: (user: UserStoreType['user']) => set(state => ({ ...state, user })),
});