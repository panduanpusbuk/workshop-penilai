// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0RFRQPHoFtvZ8_DdT8gv2DCgGfC8kzQM",
  authDomain: "workshop-penilaian.firebaseapp.com",
  projectId: "workshop-penilaian",
  storageBucket: "workshop-penilaian.firebasestorage.app",
  messagingSenderId: "913053975087",
  appId: "1:913053975087:web:c8d89b4f8ea5316bea3cda",
  measurementId: "G-TWFS28040R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);