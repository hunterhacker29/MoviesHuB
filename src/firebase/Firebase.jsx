
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-MRw6GwlwhSMnozahxTH-CmiGHCcmmyQ",
  authDomain: "movieweb-f2893.firebaseapp.com",
  projectId: "movieweb-f2893",
  storageBucket: "movieweb-f2893.appspot.com",
  messagingSenderId: "308154575917",
  appId: "1:308154575917:web:618e37cf9587ccc41ddca4",
  measurementId: "G-Z3JCSHZ1JD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage
const auth = getAuth(app);

export { app, db, storage, auth };
