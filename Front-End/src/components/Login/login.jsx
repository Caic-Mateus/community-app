import React, { useState } from 'react';
import './login.css'

function LoginForm() {
  const [form, setForm] = useState({
    email: {
      hasChanged: false,
      value: ""
    },
    password:{
      hasChanged: false,
      value: ""
    }
  })

  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }
  

  return (
    <div className="login-container">
      <div className='quadrado'>

      
    <button className="google-login-button" /*onClick={handleGoogleLogin}*/>
        <img src="../../public/img/google-37.png" alt="Google Logo" className="google-logo" />
        <span>Fazer login com o Google</span>
    </button>
    <form action="#">
        <input type="email" className="input-field" placeholder="E-mail" value={form.email.value}
          onChange={event => setForm({...form, email:{
            hasChanged: true, value: event.target.value
          }})}
         required />
        {
          form.email.hasChanged && !form.email.value
            && <div className='inputvalidation'>Email é obrigatório</div>
        }
        {
          form.email.hasChanged && !isEmailValid(form.email.value)
            && <div className='inputvalidation'>Email é invalido</div>
        }
        <input type="password" className="input-field" placeholder="Password" value={form.password.value}
          onChange={event => setForm({...form, password:{
            hasChanged: true, value: event.target.value
          }})}
        required />
        {
          form.password.hasChanged && !form.password.value
            && <div className='inputvalidation'>Senha é obrigatória</div>
        }
        <button type="button" className="input-field submit-button"
          disabled={!isEmailValid(form.email.value) || !form.password.value}
        >Entrar</button>

    </form>
    <div className="signup-text">
    Não tem uma conta? <a href="http://localhost:5173/cadastro">Inscreva-se</a>
    </div>
    </div>
    </div>

  );
}

export default LoginForm;
