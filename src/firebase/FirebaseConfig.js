// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh1VbVbcac49Rnok-UrRzN5P8XH6DB1GA",
  authDomain: "tito-6e983.firebaseapp.com",
  projectId: "tito-6e983",
  storageBucket: "tito-6e983.appspot.com",
  messagingSenderId: "1099404864022",
  appId: "1:1099404864022:web:d0ee6f8265693946ee6337",
  measurementId: "G-8YT5QQPE3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export{app,auth,db,storage}