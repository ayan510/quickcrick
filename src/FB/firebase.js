import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJSabmObM5L3vrK9KJ_4XGC8TZ8BJNcGY",
  authDomain: "crick-quick.firebaseapp.com",
  projectId: "crick-quick",
  storageBucket: "crick-quick.appspot.com",
  messagingSenderId: "11068127509",
  appId: "1:11068127509:web:c80db11e3dbcac2b24111c",
  measurementId: "G-43C0GHBDS9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
export { app, db }