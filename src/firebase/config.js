import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDT_IOl7D48K0ZIM-teqbS99llxWPDaKgE",
  authDomain: "vue3-firebase-projects-db91d.firebaseapp.com",
  projectId: "vue3-firebase-projects-db91d",
  storageBucket: "vue3-firebase-projects-db91d.appspot.com",
  messagingSenderId: "861702228438",
  appId: "1:861702228438:web:6e243346013e602bc07c77",
};

firebase.initializeApp(firebaseConfig);

const firestoreRef = firebase.firestore();
const authRef = firebase.auth();
const storageRef = firebase.storage();

const date = firebase.firestore.FieldValue.serverTimestamp;

export { firestoreRef, authRef, date, storageRef };
