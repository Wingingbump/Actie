// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4jmfcTas4pIrxMtjAcCsND8sNAo5I4Ek",
  authDomain: "actiegame.firebaseapp.com",
  projectId: "actiegame",
  storageBucket: "actiegame.appspot.com",
  messagingSenderId: "277824258246",
  appId: "1:277824258246:web:3d8dc113a6366e81afd7c7",
  measurementId: "G-S6Q5V11RSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);