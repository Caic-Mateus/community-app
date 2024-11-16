import React from 'react'
import Adm from '../components/Administrador/adm.jsx'
import AuthService from '../components/services/AuthServices';

const authService = new AuthService();
export function Administrador() {
  return (
    <>
      <div>
        <Adm authService={authService}/>
      </div>
    </>
  )
}
