import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANT2Pd2IinZrZITY2ipaqb_MNz4kMCNmg",
  authDomain: "authentication-96b47.firebaseapp.com",
  projectId: "authentication-96b47",
  storageBucket: "authentication-96b47.firebasestorage.app",
  messagingSenderId: "136168818480",
  appId: "1:136168818480:web:ceabed22bb822594442af5",
  measurementId: "G-QNL6KZLQEC"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
