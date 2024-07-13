import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../config/Firebase";

interface UseAuthHook {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthHook {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      FIREBASE_AUTH,
      async (currentUser) => {
        if (currentUser && !currentUser.emailVerified) {
          console.log("Email not verified.");
        } else {
          await AsyncStorage.setItem("user", JSON.stringify(currentUser));
          setUser(currentUser);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      if (userCredential.user && !userCredential.user.emailVerified) {
        setError("Please verify your email to log in.");
        await signOut(FIREBASE_AUTH);
      } else {
        setUser(userCredential.user);
        await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
        setError(null);
      }
    } catch (error: any) {
      setError(parseFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      setError("Please verify your email to continue.");
      console.log("Registration successful, please verify your email.");
    } catch (error: any) {
      setError(parseFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const parseFirebaseError = (errorCode: string) => {
    console.log("NEW:", errorCode);
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is badly formatted.";
      case "auth/user-disabled":
        return "This account has been disabled by an administrator.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password, please try again.";
      case "auth/invalid-credential":
        return "Incorrect Email/password, please try again.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut: signOutUser,
  };
}
