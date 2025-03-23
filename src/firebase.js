import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Define tasksCollection properly
const tasksCollection = collection(db, "tasks");

const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

const logout = async () => {
  await signOut(auth);
};

const updateStreak = async (userId) => {
  const streakRef = doc(db, "streaks", userId);
  const streakSnap = await getDoc(streakRef);
  const today = new Date().toISOString().split("T")[0];

  if (streakSnap.exists()) {
    const streakData = streakSnap.data();
    if (streakData.lastCompletedDate === today) {
      return;
    }

    const lastDate = new Date(streakData.lastCompletedDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      lastDate.toISOString().split("T")[0] ===
      yesterday.toISOString().split("T")[0]
    ) {
      await updateDoc(streakRef, {
        streakCount: streakData.streakCount + 1,
        lastCompletedDate: today,
      });
    } else {
      await updateDoc(streakRef, {
        streakCount: 1,
        lastCompletedDate: today,
      });
    }
  } else {
    await setDoc(streakRef, {
      streakCount: 1,
      lastCompletedDate: today,
    });
  }
};

const getStreak = async (userId) => {
  const streakRef = doc(db, "streaks", userId);
  const streakSnap = await getDoc(streakRef);
  return streakSnap.exists() ? streakSnap.data().streakCount : 0;
};

// Function to save the user's custom title
const setUserTitle = async (userId, title) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { title }, { merge: true });
};

// Function to retrieve the user's custom title
const getUserTitle = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data().title : "My To-Do List";
};

export {
  db,
  auth,
  signIn,
  logout,
  tasksCollection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  setDoc,
  getDoc,
  updateStreak,
  getStreak,
  setUserTitle,
  getUserTitle,
};
