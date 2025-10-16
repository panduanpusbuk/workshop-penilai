// proteksi.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// --- Konfigurasi Firebase ---
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

// --- Daftar admin yang bebas dari aturan anti-seek ---
const adminEmails = [
  "alfianfaizmi@gmail.com",
  "faiz.alfian@kemdikbud.go.id"
];

// --- Jalankan proteksi begitu halaman dimuat ---
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "index.html";
    return;
  }

  const video1 = document.getElementById('video1');
  const video2 = document.getElementById('video2');

  if (!video1) return; // kalau halaman tidak punya video

  // --- Jika admin, biarkan bebas ---
  if (adminEmails.includes(user.email)) {
    console.log("Admin login:", user.email);
    video1.controls = true;
    if (video2) video2.controls = true;
    return;
  }

  // --- Peserta biasa: aktifkan anti-seek ---
  console.log("Peserta login:", user.email);
  let lastTime = 0;
  video1.addEventListener('timeupdate', () => {
    if (Math.abs(video1.currentTime - lastTime) > 0.3) {
      video1.currentTime = lastTime;
    } else {
      lastTime = video1.currentTime;
    }
  });

  // --- Nonaktifkan tombol skip ---
  window.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', ' ', 'k', 'j', 'l'].includes(e.key)) {
      e.preventDefault();
    }
  });

  // --- Jika video selesai ---
  video1.addEventListener('ended', () => {
    const materiKey = document.body.dataset.materi || 'materi1';
    localStorage.setItem(`${materiKey}_selesai`, 'true');
    alert(`${materiKey} selesai! Akses ke materi berikutnya sudah terbuka.`);
  });
});

// --- Cegah klik kanan dan shortcut developer tools ---
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'u') e.preventDefault();
  if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || e.key === 'F12') e.preventDefault();
});
