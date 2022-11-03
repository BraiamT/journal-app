// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();

// console.log( process.env );
// console.log( import.meta.env );

// Your web app's Firebase configuration
// #>> Environment: DEV <<#
// const firebaseConfig = {
//   apiKey: "AIzaSyAjq4R08Ufp8WnRHATuwElviAqQ-V_XnFw",
//   authDomain: "react-course-fh-8ce9b.firebaseapp.com",
//   projectId: "react-course-fh-8ce9b",
//   storageBucket: "react-course-fh-8ce9b.appspot.com",
//   messagingSenderId: "831853464343",
//   appId: "1:831853464343:web:e405f621773d45708e0552"
// };

// #>> Environment: TEST <<#
// const firebaseConfig = {
//   apiKey: "AIzaSyAs9HoPZ7QyqjF4etFDRUHbgyl4_nrT57w",
//   authDomain: "react-course-fh-testing.firebaseapp.com",
//   projectId: "react-course-fh-testing",
//   storageBucket: "react-course-fh-testing.appspot.com",
//   messagingSenderId: "79686021436",
//   appId: "1:79686021436:web:a745605c68ba28908eae39"
// };

// #>> Aiming to dotenv: <<#
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

// console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
