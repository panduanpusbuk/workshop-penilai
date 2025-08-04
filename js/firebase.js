// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD0RFRQPHoFtvZ8_DdT8gv2DCgGfC8kzQM",
  authDomain: "workshop-penilaian.firebaseapp.com",
  projectId: "workshop-penilaian",
  storageBucket: "workshop-penilaian.firebasestorage.app",
  messagingSenderId: "913053975087",
  appId: "1:913053975087:web:c8d89b4f8ea5316bea3cda",
  measurementId: "G-TWFS28040R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Fungsi login dengan Google
export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch(err => alert("Login gagal: " + err.message));
}

// Fungsi logout
export function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      window.location.href = "index.html"; // atau halaman login
    })
    .catch((error) => {
      console.error("Logout gagal:", error);
    });
}
// Fungsi untuk cek login
export function checkAuth(onSuccess) {
  onAuthStateChanged(auth, user => {
    if (user) {
      onSuccess(user);
    } else {
      window.location.href = "index.html";
    }
  });
}
