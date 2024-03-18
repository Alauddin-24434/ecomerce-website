/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";




export const AuthContext = createContext(null);
const Provider = new GoogleAuthProvider()
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [loader, setLoading] = useState(true)
    const [authUser, setAuthUser] = useState()

    //user create SignUp page
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // user login page

    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // google login
    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, Provider);
    }

    // onAuth state changed
    useEffect(() => {
        const unSubsCribe = onAuthStateChanged(auth, currentUser => {
           
          
            setAuthUser(currentUser);
          
           
         
           
        })
       return()=>{
        setLoading(false)
        unSubsCribe;
       
       }

    }, [])

   // log out
   const userLogOut = () => {
    setLoading(true)
    return signOut(auth)
}

    const userInfo = {
        createUser,
        userLogin,
        loader,
        authUser,
        userLogOut,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


