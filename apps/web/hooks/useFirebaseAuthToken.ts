// hooks/useFirebaseAuthToken.ts
import { useEffect } from "react";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import { fetchUserDetails } from "@/lib/api/auth";
import { fetchNotes } from "@/lib/api/notes";
import { useRootStore } from "@/app/store/rootStore";

export function useFirebaseAuthTokenSync() {
    const { setUser, setNotes, setNotesLoading } = useRootStore();


    const fetchAndSetUserDetails = async (email: string) => {
        let res = await fetchUserDetails(email);
        setUser(res);
    }

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                localStorage.setItem("token", token);
                if (user.email) {
                    fetchAndSetUserDetails(user.email);

                    setNotesLoading(true)
                    let userNotes = await fetchNotes();
                    setNotes(userNotes);
                }
            } else {
                localStorage.removeItem("token");
            }
        });

        return () => unsubscribe();
    }, []);
}
