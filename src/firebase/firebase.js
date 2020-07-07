import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const config = {
  apiKey: 'AIzaSyAvkAZus8aMKbGCv605ZZAvVU3IV_rzbWI',
  authDomain: 'tito-2e194.web.app',
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: 'tito-2e194',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

export { db, auth, firebase, functions };
