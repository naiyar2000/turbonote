import { StateCreator } from "zustand";
import { PortfolioStore } from "./rootStore";

type VarianType = "secondary" | "link" | "default" | "destructive" | "outline" | "ghost" | null | undefined;

export type DialogStore = {
    isOpen: boolean;
    title: string;
    message: string;
    actionButtonText?: string;
    actionButtonVariant?: VarianType;
    actionLoader?: boolean;
    onConfirm?: () => void;
    onDialogClose: () => void;
    onDialogOpen: ({ title, message, onConfirm, actionButtonText, actionButtonVariant }: { title: string; message: string; onConfirm: () => void; actionButtonText?: string, actionButtonVariant?: VarianType }) => void;
    setActionLoader?: (loading: boolean) => void;
};
export const createDialogSlice: StateCreator<PortfolioStore, [['zustand/devtools', never]], [], DialogStore> = (set) => ({
    isOpen: false,
    title: "",
    message: "",
    onDialogClose: () => set({
        isOpen: false,
        title: "",
        message: "",
        actionLoader: false,
        actionButtonText: undefined,
        actionButtonVariant: undefined
    }),
    setActionLoader: (loading) => set({ actionLoader: loading }),
    onDialogOpen: ({ title, message, onConfirm, actionButtonText, actionButtonVariant }) => set({ isOpen: true, title, message, onConfirm, actionButtonText, actionButtonVariant }),
});