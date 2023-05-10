// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut,
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail, 
  } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.ITE_FIREBASE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Google Firebase Auth
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const auth = getAuth(app);

export const login = ({email, password}) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return signOut(auth);
}

//SIGNIN WITH POPUP
export const loginWithGoogle = async() => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user; // The signed-in user info.
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email; // The email of the user's account used.
      const credential = GoogleAuthProvider.credentialFromError(error); // The AuthCredential type that was used.
    });
}

//Register new user
export const registerNewUser = async({email, password}) => {
  return createUserWithEmailAndPassword(auth, email, password)
    // .then((result) => {
    //   console.log(result.user)
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   const email = error.customData.email; // The email of the user's account used.
    //   const credential = GoogleAuthProvider.credentialFromError(error); // The AuthCredential type that was used.
    // });
}
