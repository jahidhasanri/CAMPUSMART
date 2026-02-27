import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import axios from "axios";
import useAxios from "../Hooks/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxios();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axiosSecure.get(
            `/users?email=${currentUser.email}`,
          );

          const dbUser = res.data[0];
          setUser({ ...currentUser, ...dbUser });
          // console.log(user);
        } catch (err) {
          console.error("Error fetching db user", err);
          setUser(currentUser);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    updateUserProfile,
    login,
    loginWithGoogle,
    logout,
  };
  // console.log(user);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
