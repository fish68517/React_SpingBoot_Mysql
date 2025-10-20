import { auth as firebaseAuth } from "../firebase"; // To avoid naming conflict with the main 'auth' export
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification
} from 'firebase/auth';

import * as SecureStore from 'expo-secure-store';

// Creates a new user with email and password. Returns the user object on success, or null on failure.
const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        return userCredential.user; // Should always be defined if no error is thrown
    } catch (error) {
        console.error("Error creating user: ", error);
        return null;
    }
}

// Signs in for a user with email and password. Returns the user object on success, or null on failure.
const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        // Get Firebase ID token from the signed-in user
        const idToken = await userCredential.user.getIdToken();

        // Exchange ID token for a session cookie from our backend
        try {
            const resp = await fetch('http://localhost:4000/session/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken })
            });
            if (!resp.ok) throw new Error('Failed to create session cookie');
            const data = await resp.json();
            const { sessionCookie } = data;
            await SecureStore.setItemAsync('sessionCookie', sessionCookie);
        } catch (err) {
            console.error('Failed to exchange token for session cookie:', err);
        }

        return userCredential.user; // Should always be defined if no error is thrown
    } catch (error) {
        console.error("Error signing in user: ", error);
        return null;
    }
}

// ...existing code...


// Sends password reset email to the given email address. Does not return anything.
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(firebaseAuth, email);
        console.log("Email sent successfully"); // Only reaches here if no error
    } catch (error) {
        console.error("Error sending password reset email: ", error);
    }
}

const emailVerification = async (email) => {
    // TODO: Implement email verification logic (use sendEmailVerification)
    return;
}

// Checks if a session cookie exists and verifies it with the backend
const autoSignIn = async () => {
    const sessionCookie = await SecureStore.getItemAsync('sessionCookie');
    if (!sessionCookie) return false;

    try {
        const resp = await fetch('http://localhost:4000/session/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionCookie })
        });
        if (!resp.ok) return false;
        const data = await resp.json();
        return !!data.valid;
    } catch (err) {
        console.error('Error verifying session cookie:', err);
        return false;
    }
}

// Sign out by removing session cookie locally and telling backend to revoke it
const signOut = async () => {
    const sessionCookie = await SecureStore.getItemAsync('sessionCookie');
    try {
        if (sessionCookie) {
            await fetch('http://localhost:4000/session/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionCookie })
            });
        }
    } catch (err) {
        console.error('Error logging out on backend:', err);
    }
    await SecureStore.deleteItemAsync('sessionCookie');
}

// Bundles everything to match the mock structure
export const auth = {
    createUser,
    signIn,
    sendPasswordReset,
    emailVerification,
    signOut,
    autoSignIn
}