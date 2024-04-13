import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8Z8HgLM4p1hpTINH6uz9Gqd3iwfIM4OA",
  authDomain: "news-admin-63600.firebaseapp.com",
  databaseURL: "https://news-admin-63600-default-rtdb.firebaseio.com",
  projectId: "news-admin-63600",
  storageBucket: "news-admin-63600.appspot.com",
  messagingSenderId: "776715761993",
  appId: "1:776715761993:web:bd94d5a1a1142f9b674298",
  measurementId: "G-0TRGRV78QV"
};

export const app = initializeApp(firebaseConfig);
