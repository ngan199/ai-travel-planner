// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzgt44VdsTG-_Nc2iOlTOeulYqdMY4ftg",
  authDomain: "ai-travel-planner-9e797.firebaseapp.com",
  projectId: "ai-travel-planner-9e797",
  storageBucket: "ai-travel-planner-9e797.firebasestorage.app",
  messagingSenderId: "242998653715",
  appId: "1:242998653715:web:5d4a45658ce87f7a3120e6",
  measurementId: "G-G4RBZ4BKYN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);