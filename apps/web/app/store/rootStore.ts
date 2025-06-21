import { create } from "zustand";
import { createNoteSlice, NotesStore } from "./noteStore";
import { createUserSlice, UserStoreType } from "./userStore";
import { devtools } from "zustand/middleware";

export type PortfolioStore = UserStoreType & NotesStore;

export const useRootStore = create<PortfolioStore>()(
    devtools((...args) => ({
        ...createUserSlice(...args),
        ...createNoteSlice(...args),
    })),
)