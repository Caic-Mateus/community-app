import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import { Login } from './pages/login.jsx'
import { Cadastro } from './pages/cadastro.jsx'
import {Feed} from './pages/feed.jsx'


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

const auth = firebaseAuth.initializeAuth(app);

firebaseAuth.signInWithEmailAndPassword(
  auth, 'teste@gmail.com','123456'
).then(user => console.log(user))
.catch(error => console.log('error', error))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/cadastro',
    element: <Cadastro/>
  },
  {
    path: '/feed',
    element: <Feed/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
