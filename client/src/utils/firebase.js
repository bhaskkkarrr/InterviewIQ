import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "interviewiq-a2a0f.firebaseapp.com",
  projectId: "interviewiq-a2a0f",
  storageBucket: "interviewiq-a2a0f.firebasestorage.app",
  messagingSenderId: "426684802271",
  appId: "1:426684802271:web:43be119ab0d2298b46756a",
  measurementId: "G-RRQDXP07JJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export { auth, authProvider };
