// lib/firebase.ts
"use client";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const firebaseSignOut = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('token'); // remove token
            window.location.href = '/login';  // redirect to login
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
};


export { auth, provider, app, firebaseSignOut };
