import React from 'react'
import CadastroForm from '../components/Cadastro/cadastro'
import '../components/Shared/app.css';

export function Cadastro() {
  return (
    <>
    <div className='app-container'>
      <div className="header">
          <img src="../../public/img/Ft_cu.png" alt="Imagem 1" />
          <img src="../../public/img/Ft_Commu Unity.png" alt="Imagem 2" />
      </div>
      <CadastroForm />
    </div>
    </>
  )
}
