import {getApp, getApps, initializeApp} from "firebase/app";

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getFunctions} from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD2CG8AiG8VIh_BRWbwm1i16gmY93-VrEw",
  authDomain: "saas-chat-translator-app.firebaseapp.com",
  projectId: "saas-chat-translator-app",
  storageBucket: "saas-chat-translator-app.appspot.com",
  messagingSenderId: "573556902611",
  appId: "1:573556902611:web:2d66df7d35e35d3ff96226"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export {firebaseAuth, db, functions};	
