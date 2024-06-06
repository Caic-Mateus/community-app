import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AuthService from './components/services/AuthServices.jsx';

import { Login } from './pages/login.jsx'
import { Cadastro } from './pages/cadastro.jsx'
import {Feed} from './pages/feed.jsx'

const authService = new AuthService();


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login authService={authService} />,
    
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
