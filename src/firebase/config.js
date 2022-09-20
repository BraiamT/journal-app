// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjq4R08Ufp8WnRHATuwElviAqQ-V_XnFw",
  authDomain: "react-course-fh-8ce9b.firebaseapp.com",
  projectId: "react-course-fh-8ce9b",
  storageBucket: "react-course-fh-8ce9b.appspot.com",
  messagingSenderId: "831853464343",
  appId: "1:831853464343:web:e405f621773d45708e0552"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
