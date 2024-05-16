import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUWxk0YoTodAAflUMyvlJlB-p9xk4sM4g",
  authDomain: "lyriclink-2e3d6.firebaseapp.com",
  projectId: "lyriclink-2e3d6",
  storageBucket: "lyriclink-2e3d6.appspot.com",
  messagingSenderId: "1031045986513",
  appId: "1:1031045986513:web:7a9b01f5653db55e50adf0",
  measurementId: "G-PJY350YF3R"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };

export const auth = getAuth(app);