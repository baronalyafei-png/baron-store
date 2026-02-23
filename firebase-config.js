// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// بيانات مشروعك من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDewzXSJgRNXN1HSsYVSxofanqt-EA-ZYw",
  authDomain: "baron-electronics.firebaseapp.com",
  projectId: "baron-electronics",
  storageBucket: "baron-electronics.firebasestorage.app",
  messagingSenderId: "756795203266",
  appId: "1:756795203266:web:d9f0512ff393ae596be55b"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات
export const auth = getAuth(app);
export const db = getFirestore(app);