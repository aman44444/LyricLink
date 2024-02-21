// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUWqZO-ALa9krDkpRo31XFE5BosdZP73c",
  authDomain: "tinder-a03ae.firebaseapp.com",
  projectId: "tinder-a03ae",
  storageBucket: "tinder-a03ae.appspot.com",
  messagingSenderId: "595721187335",
  appId: "1:595721187335:web:c31558a29c94d0d27a3aa2",
  measurementId: "G-D04MFJTZ0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
