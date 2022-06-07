import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCczu0nhkrY7nYa_CB7GqqgEmfuggXD-1o',
  authDomain: 'pet-vue3.firebaseapp.com',
  projectId: 'pet-vue3',
  storageBucket: 'pet-vue3.appspot.com',
  messagingSenderId: '332041943143',
  appId: '1:332041943143:web:ad30303c19328aca3bbcc2',
  measurementId: 'G-MGZLLX3VVR',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
