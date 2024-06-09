import React from 'react'
import PerfilForm from '../components/Perfil/perfil'
import AuthService from '../components/services/AuthServices';

const authService = new AuthService();
export function Perfil() {
  return (
    <>
      <div>
        <PerfilForm authService={authService}/>
      </div>
    </>
  )
}
