// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  where,
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import titlesDatabase from "../data.json";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.ITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Google Firebase Auth
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const auth = getAuth(app);

export const login = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

//SIGNIN WITH GOOGLE (Popup)
export const loginWithGoogle = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user; // The signed-in user info.
    })
    .catch((error) => {
      console.log(error.code);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email; // The email of the user's account used.
      const credential = GoogleAuthProvider.credentialFromError(error); // The AuthCredential type that was used.
    });
};

//Register new user
// export const registerNewUser = async ({ name, email, password }) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name: name,
//       authProvider: "local",
//       email: email,
//       isBookmarked: [],
//       isAdmin: false,
//       darkMode: false,
//       displayTrending: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://gamo-entertainment-app.netlify.app',
  // This must be true.
  handleCodeInApp: true
};

export const registerNewUser = async({name, email, password}) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      alert("Link successfully sent to the email address: " + email)
      window.localStorage.setItem('emailForSignIn', email);
      // ...
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ...
    });
}

export const isSignedInWithEmail = async({email}) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
}

export const fetchTitles = async () => {
  try {
    const titles = await getDocs(collection(db, "titles"));
    var data = [];
    titles.forEach((title) => {
      data.push(title.data());
    });
    return data;
  } catch (error) {
    console.log("An error occured while fetching user data: " + error);
  }
};

export const fetchCategories = async () => {
  try {
    const categories = await getDocs(collection(db, "categories"));
    var categoryData = [];
    categories.forEach((category) => {
      categoryData.push(category.data());
    });
    return categoryData;
  } catch (error) {
    console.log("Error loading categories: " + error);
  }
};

export const fetchUserProfile = async (uid) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const users = await getDocs(q);
    const data = users.docs[0].data();
    return data;
  } catch (error) {
    console.log("An error occured while fetching user data: " + error);
  }
};

//Updates Profile preferences
export const updateUserProfile = async (user, updatedProfile) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const users = await getDocs(q);
    users.forEach(async (u) => {
      const getUser = doc(db, "users", u.id);
      await setDoc(getUser, updatedProfile);
    });
  } catch (error) {
    console.log("Error updating user profile" + error);
  }
};

//Update individual title
export const updateTitle = async (title) => {
  const updatedTitle = {
    id: title.id,
    title: title.name,
    thumbnail: title.thumbnail,
    year: title.year,
    category: title.category,
    rating: title.rating,
    isTrending: title.isTrending,
  };

  try {
    const q = query(collection(db, "titles"), where("id", "==", title.id));
    const titles = await getDocs(q);
    titles.forEach(async (title) => {
      const getTitle = doc(db, "titles", title.id);
      await setDoc(getTitle, updatedTitle);
    });
  } catch (error) {
    console.log("Error updating the title, error: " + error);
  }
};

//Updates bookmarked titles in user
export const updateBookmarked = async (user, titleID, isBookmarked) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const users = await getDocs(q);
    users.forEach(async (u) => {
      const getUser = doc(db, "users", u.id);
      if (isBookmarked) {
        await updateDoc(getUser, {
          isBookmarked: arrayRemove(titleID),
        });
      } else {
        await updateDoc(getUser, {
          isBookmarked: arrayUnion(titleID),
        });
      }
    });
    return fetchUserProfile(user.uid)
  } catch (error) {
    console.log("Error updating bookmark title" + error);
  }
};

//To import a new database from a JSON file
export const loadNewDatabase = async () => {
  try {
    titlesDatabase.forEach((title) => {
      console.log("Adding titles to the database...");
      addDoc(collection(db, "titles"), {
        id: title.id,
        title: title.title,
        thumbnail: title.thumbnail,
        year: title.year,
        category: title.category,
        rating: title.rating,
        isTrending: title.isTrending,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
