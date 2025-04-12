
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage'; // Import Firebase Storage
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyCFBlRIW-C9IJXxTa-TH-IOz6hZfcbOB-Q",
//   authDomain: "movieshub-9efa0.firebaseapp.com",
//   projectId: "movieshub-9efa0",
//   storageBucket: "movieshub-9efa0.firebasestorage.app",
//   messagingSenderId: "1089877979161",
//   appId: "1:1089877979161:web:c37a8a7ed691677fd2ba88",
//   measurementId: "G-1SPQS3Z7LD"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app); // Initialize Firebase Storage
// const auth = getAuth(app);

// export { app, db, storage, auth };


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-MRw6GwlwhSMnozahxTH-CmiGHCcmmyQ",
  authDomain: "movieweb-f2893.firebaseapp.com",
  databaseURL: "https://movieweb-f2893-default-rtdb.firebaseio.com",
  projectId: "movieweb-f2893",
  storageBucket: "movieweb-f2893.appspot.com",
  messagingSenderId: "308154575917",
  appId: "1:308154575917:web:618e37cf9587ccc41ddca4",
  measurementId: "G-Z3JCSHZ1JD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Ensuring correct initialization
const auth = getAuth(app);

export { app, db, storage, auth };
