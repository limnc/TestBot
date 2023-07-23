// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNRPQfbwuWEidW-FTs-wVCJgpsOXJuEig",
  authDomain: "robot-43657.firebaseapp.com",
  databaseURL: "https://robot-43657-default-rtdb.firebaseio.com",
  projectId: "robot-43657",
  storageBucket: "robot-43657.appspot.com",
  messagingSenderId: "360391454242",
  appId: "1:360391454242:web:096ba640e68b1f3613647b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

export default database