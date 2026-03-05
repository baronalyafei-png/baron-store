// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
collection,
getDocs,
addDoc,
doc,
setDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// إعداد Firebase
const firebaseConfig = {
apiKey: "AIzaSyCVF7sTj4HEdOCPLY7ptIGXk616QS8Y-CU",
authDomain: "baron-stor-system.firebaseapp.com",
projectId: "baron-stor-system",
storageBucket: "baron-stor-system.firebasestorage.app",
messagingSenderId: "658891221940",
appId: "1:658891221940:web:dbfa217d64a3d0d8b860e1",
measurementId: "G-7B4DWB5LTY"
};


// تشغيل Firebase
const app = initializeApp(firebaseConfig);


// الخدمات
const auth = getAuth(app);
const db = getFirestore(app);


// تصديرها لباقي الملفات
export {
auth,
db,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
collection,
getDocs,
addDoc,
doc,
setDoc,
updateDoc
};
