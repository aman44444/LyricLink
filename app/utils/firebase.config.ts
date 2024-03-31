import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };

