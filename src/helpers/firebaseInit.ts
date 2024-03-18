import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBput26EGM8krEG0vV6qTanwUo2Juqg6CA",
  authDomain: "food-app-5204e.firebaseapp.com",
  databaseURL:
    "https://food-app-5204e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "food-app-5204e",
  storageBucket: "food-app-5204e.appspot.com",
  messagingSenderId: "352120165873",
  appId: "1:352120165873:web:d3449fe3751363b9bda050",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
