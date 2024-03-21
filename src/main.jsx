import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import { Login } from './pages/login.jsx'
import { Cadastro } from './pages/cadastro.jsx'
import {Feed} from './pages/feed.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/signup',
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
