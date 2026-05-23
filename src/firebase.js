import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyoDCmlUevnAXILVwla9jJE-G_8c2c34A",
  authDomain: "lyon-cars-45407.firebaseapp.com",
  projectId: "lyon-cars-45407",
  storageBucket: "lyon-cars-45407.firebasestorage.app",
  messagingSenderId: "846047495343",
  appId: "1:846047495343:web:59dd6388946b6b2710c05a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;