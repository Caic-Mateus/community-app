import React from 'react';
import './cadastro.css'

function CadastroForm() {
  return (
   <div className="Cadastro-container">
         <form action="#">
          <input type="text" className='TextField ' placeholder='Nome completo' required/>
          <input type="text" className='TextField ' placeholder='Usuario' required/>
          <input type="tel" className='TextField ' placeholder='(11)99999-9999' required/>
          <input type="text" className='TextField' placeholder='Curso' required/>
          <input type="date" className='TextField' required/>
          <input type="text" className="TextField" placeholder="E-mail" required />
          <input type="password" className="TextField" placeholder="Senha" required />
          <input type="password" className="TextField" placeholder="Confirmar senha" required />
          <input type="submit" className="Button-Cadastro" value="Cadastrar" />
         
    </form>
    <div className="signup-text">
    Não tem uma conta? <a href="#">Inscreva-se</a>
    </div>
   </div>

  );
}

export default CadastroForm;
