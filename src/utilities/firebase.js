// Import the functions you need from the SDKs you need
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGw1WS6Q5bylv6_UGHnUWe6LQzFRYj4sI",
  authDomain: "scheduler-86daa.firebaseapp.com",
  databaseURL: "https://scheduler-86daa-default-rtdb.firebaseio.com",
  projectId: "scheduler-86daa",
  storageBucket: "scheduler-86daa.appspot.com",
  messagingSenderId: "967232068511",
  appId: "1:967232068511:web:5a568a08d34f35f670fbaa",
  measurementId: "G-SDP4ZGQWP5"
};
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };
export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const setData = (path, value) => (
  set(ref(database, path), value)
);
export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };