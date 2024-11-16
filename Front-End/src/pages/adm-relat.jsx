import React from 'react'
import Adm from '../components/AdminRelatorios/adm'
import AuthService from '../components/services/AuthServices';

const authService = new AuthService();
export function AdministradorRelat() {
  return (
    <>
      <div>
        <Adm authService={authService}/>
      </div>
    </>
  )
}
