import 'firebase/auth';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDVN41pVjBZitsKhHlPvUvJzqADIyU2gEw",
  authDomain: "mygit-70959.firebaseapp.com",
  projectId: "mygit-70959",
  storageBucket: "mygit-70959.appspot.com",
  messagingSenderId: "262669352304",
  appId: "1:262669352304:web:981ea8145f4d6bba6de3b5",
  measurementId: "G-LH2PNPH2LM"
};

// Initialize Firebase
 
export const app = initializeApp(firebaseConfig);


 const API_URL = 'https://api.github.com';
