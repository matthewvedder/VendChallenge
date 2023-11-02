import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRzzykcHa5Kp_65PjJDClUs8JhYUKW-rI",
  authDomain: "vend-take-home.firebaseapp.com",
  projectId: "vend-take-home",
  storageBucket: "vend-take-home.appspot.com",
  messagingSenderId: "535402594670",
  appId: "1:535402594670:web:b216a64b455c9fe7da017f",
  measurementId: "G-86FK0FXFWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);