import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmf3aV6xBPso4EKsV_F5B4DA1cBT61QHM",
  authDomain: "luhaiftestproject.firebaseapp.com",
  projectId: "luhaiftestproject",
  storageBucket: "luhaiftestproject.appspot.com",
  messagingSenderId: "824592813130",
  appId: "1:824592813130:web:c4e14da7ccebdea32a2ab3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
