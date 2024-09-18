// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "auth-88dfe.firebaseapp.com",
  projectId: "auth-88dfe",
  storageBucket: "auth-88dfe.appspot.com",
  messagingSenderId: "786216320207",
  appId: "1:786216320207:web:8af37d19717fec3ad90bba",
  measurementId: "G-FNHKMLWQJ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);