import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFSpK1VcsfJkz2lfBJ9AsQ5kx-1gayMY8",
  authDomain: "easyjob-478ef.firebaseapp.com",
  databaseURL:
    "https://easyjob-478ef-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "easyjob-478ef",
  storageBucket: "easyjob-478ef.appspot.com",
  messagingSenderId: "194936528598",
  appId: "1:194936528598:web:8c05e05b2f7a5176b7f377",
  measurementId: "G-YM6MKLFLVZ",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, db, auth };
