import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCsnas8GvFGdRSowd9cO_FTjqWFXq4NL5c",
  authDomain: "commu-unity.firebaseapp.com",
  databaseURL: "https://commu-unity-default-rtdb.firebaseio.com",
  projectId: "commu-unity",
  storageBucket: "commu-unity.appspot.com",
  messagingSenderId: "902570290287",
  appId: "1:902570290287:web:8742495b0bd4c63f50f19a",
  measurementId: "G-KE41MJQT9E"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebaseAuth.initializeAuth(app);

