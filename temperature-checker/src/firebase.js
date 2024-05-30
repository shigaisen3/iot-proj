import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCM438FkgZc3yAzPmRHw5K-hZbRr07uxmo",
    authDomain: "temperature-monitor-385fb.firebaseapp.com",
    databaseURL: "https://temperature-monitor-385fb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "temperature-monitor-385fb",
    storageBucket: "temperature-monitor-385fb.appspot.com",
    messagingSenderId: "352765848879",
    appId: "1:352765848879:web:8e4ef01bf803cd7a8c45da"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;