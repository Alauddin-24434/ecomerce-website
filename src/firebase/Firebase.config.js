// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGQdnt13RDZOfqfT2hLbcATWSjx3_sPog",
  authDomain: "e-commerce-bazar.firebaseapp.com",
  projectId: "e-commerce-bazar",
  storageBucket: "e-commerce-bazar.appspot.com",
  messagingSenderId: "360687206021",
  appId: "1:360687206021:web:d4744c2e184866090df3ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;