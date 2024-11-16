import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "./_firebase.confic";
import useAxiosSecure from "../Hooks/useAxiosSecure";


export const Authcontext = createContext(null);
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const axios = useAxiosSecure();


  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google sing in
  const googleSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };

//   sing out 
const logOut = ()=>{
    setLoader(true);
    return signOut(auth)
}

  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, (currentUser) => {
      setLoader(false);
      
      axios.post('http://localhost:5000/jwt',{email:currentUser?.email})
      console.log(currentUser);
      setUser(currentUser);
    });

    return () => {
      return unSubscriber();
    };
    
  }, []);

  const authInfo = { user, loader, createUser, loginUser, googleSignIn,logOut };


  return (
    <Authcontext.Provider value={authInfo}>
        {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;
