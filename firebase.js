// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI5sXcMFb10sWYPo5nhgLIBEwCV7QHlys",
  authDomain: "auth-app-dadfe.firebaseapp.com",
  projectId: "auth-app-dadfe",
  storageBucket: "auth-app-dadfe.appspot.com",
  messagingSenderId: "554962575378",
  appId: "1:554962575378:web:57f12f69b5dd2665a6b8cb"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0)
{
    app=firebase.initializeApp(firebaseConfig);
}
else
{
    app=firebase.app()
}

const auth = firebase.auth()

export {auth};