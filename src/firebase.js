import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyCJySLuAsl9Kb1Uk-cHa8EaH4pE4ueoaBo",
  authDomain: "package-dekstop.firebaseapp.com",
  databaseURL: "https://package-dekstop-default-rtdb.firebaseio.com",
  projectId: "package-dekstop",
  storageBucket: "package-dekstop.appspot.com",
  messagingSenderId: "313409620631",
  appId: "1:313409620631:web:dc32e6863aefe64c20b7d2",
  measurementId: "G-SFS57HKY7V",
};

export const app = initializeApp(firebaseConfig);
