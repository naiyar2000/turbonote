import { create } from "zustand";
import { createNoteSlice, NotesStore } from "./noteStore";
import { createUserSlice, UserStoreType } from "./userStore";
import { devtools } from "zustand/middleware";
import { DialogStore } from "./dialogStore";
import { createDialogSlice } from "./dialogStore";

export type PortfolioStore = UserStoreType & NotesStore & DialogStore;
export const useRootStore = create<PortfolioStore>()(
    devtools((...args) => ({
        ...createUserSlice(...args),
        ...createNoteSlice(...args),
        ...createDialogSlice(...args),
    })),
)