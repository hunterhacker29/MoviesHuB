
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage
const auth = getAuth(app);

export { app, db, storage, auth };
