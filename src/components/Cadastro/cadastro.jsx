import React from 'react';
import './cadastro.css'

function CadastroForm() {
  return (
   <div className="Cadastro-container">
         <form action="#">
          <div className='Input-Text'>
          <input type="text" className='TextBlock1 ' placeholder='Nome completo' required/>
          <input type="text" className='TextBlock1 ' placeholder='Usuario' required/>
          </div>
          <div className='Input-Text'>
          <input type="text" className='TextBlock2 ' placeholder="E-mail" required />
          <input type="tel" className='TextBlock2 ' placeholder='(11)99999-9999' required/>
          </div>
          <div className='Input-Text'>
          <input type="date" className='TextBlock2 ' required/>
          <input type="text" className='TextBlock2 '  placeholder='Curso' required/>
          </div>
          <div className='Input-Text'>
          <input type="password" className='TextBlock2 ' placeholder="Senha" required />
          <input type="password" className='TextBlock2 ' placeholder="Confirmar senha" required />
          </div>
          <input type="submit" className="Button-Cadastro" value="Cadastrar" />
    </form>
    <div className="signup-text">
    Não tem uma conta? <a href="#">Inscreva-se</a>
    </div>
   </div>

  );
}

export default CadastroForm;
