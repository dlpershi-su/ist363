import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Import Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyBFrcVlMLpSlptBmUbsOknIRfS7A5_CcOY",
  authDomain: "ottos-kitchen.firebaseapp.com",
  projectId: "ottos-kitchen",
  storageBucket: "ottos-kitchen.firebasestorage.app",
  messagingSenderId: "51505366207",
  appId: "1:51505366207:web:2ffa0a347c75315744f20a",
  measurementId: "G-8SP7YP6SFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export app, db, and auth
export { app, db, auth };


