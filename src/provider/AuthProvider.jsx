/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
const [dbUser, setDbUser] = useState(null);
  const [loader, SetLoader] = useState(true);
console.log(firebaseUser?.email)



   useEffect(() => {
    if (firebaseUser?.email) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${firebaseUser?.email}`);
          console.log(response)
          setDbUser(response);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [firebaseUser?.email]);

  console.log(dbUser)








  const provider = new GoogleAuthProvider();
  const handelWithRegister = (email, password) => {
    SetLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const handelLogout = () => {
    SetLoader(true);
    return signOut(auth);
  };

  const handleLoginwithEmail = (email, password) => {
    SetLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLoginWithGoogle = () => {
    SetLoader(true);
    return signInWithPopup(auth, provider);
  };

  const authInfo = {
   firebaseUser,
  dbUser,
    loader,
    SetLoader,
    handelWithRegister,
    handelLogout,
    handleLoginwithEmail,
    handleLoginWithGoogle,
  };

  // observer
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       SetUser(currentUser || null);
  //       SetLoader(false);
  //     } else {
  //       SetUser(null);
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setFirebaseUser(currentUser || null);
        SetLoader(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
