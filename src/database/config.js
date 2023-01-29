// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOcFtzjhYD8fTMWw5c8Jsf0nbYoOzI9B0",
  authDomain: "hl-scc.firebaseapp.com",
  projectId: "hl-scc",
  storageBucket: "hl-scc.appspot.com",
  messagingSenderId: "548462171034",
  appId: "1:548462171034:web:28ba9bf9c4d6d02be06023",
  measurementId: "G-2PHHW9XD47",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
