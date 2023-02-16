// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBB7XCdFI6Qm_aD-BiP2o2ECWDh-N1OTqo',
  authDomain: 'watchnest-ea8cf.firebaseapp.com',
  projectId: 'watchnest-ea8cf',
  storageBucket: 'watchnest-ea8cf.appspot.com',
  messagingSenderId: '586985691021',
  appId: '1:586985691021:web:1b9121065cbf0916e90fc4',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db,
};
