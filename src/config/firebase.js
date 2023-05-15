// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, query, where, addDoc, collection, getDocs, doc, updateDoc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import titlesDatabase from '../data.json';

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut,
    createUserWithEmailAndPassword,
  } from "firebase/auth"

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
export const registerNewUser = async({name, email, password}) => {
  try{ 
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.id,
      name,
      authProvider: "local",
      email,
      isBookmarked: [],
      darkMode: false,
      displayTrending: true,
    });
  } catch (error) {
    return error;
  }
};

export const fetchUserProfile = async(uid) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const users = await getDocs(q);
    const data = users.docs[0].data();
    return data
  } catch (error) {
    console.log("An error occured while fetching user data: " + error);
  }
}

//Updates Profile preferences
export const updateUserProfile = async(user, updatedProfile) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const users = await getDocs(q);
    users.forEach(async (u) => {
      const getUser = doc(db, 'users', u.id);
      await setDoc(getUser, updatedProfile);
    })
  } catch (error) {
    console.log("Error updating user profile" + error)
  }
}

//Updates bookmarked titles
export const updateBookmarked = async (user, titleID, isBookmarked) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const users = await getDocs(q);
    users.forEach(async (u) => {
      const getUser = doc(db, 'users', u.id);
      if (isBookmarked){
        await updateDoc(getUser, {
          isBookmarked: arrayRemove(titleID)
        })
      }else{
        await updateDoc(getUser, {
          isBookmarked: arrayUnion(titleID)
        })
      }
    })
  } catch (error) {
    console.log("Error updating bookmark title" + error)
  }
}


export const loadNewDatabase = async() => {
  try{
    titlesDatabase.forEach(title => {
      console.log("Adding titles to the database...")
      addDoc(collection(db, "titles"), {
        id: title.id,
        title: title.title,
        year: title.year,
        category: title.category,
        rating: title.rating,
        isTrending: title.isTrending,
      });
    });
  } catch (error) {
    console.log(error)
  }
}
