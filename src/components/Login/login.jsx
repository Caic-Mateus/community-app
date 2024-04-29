import React from 'react';
import './login.css'

function LoginForm() {
  return (
    <div className="login-container">
      <div className='quadrado'>

      
    <button className="google-login-button" /*onClick={handleGoogleLogin}*/>
        <img src="../../public/img/google-37.png" alt="Google Logo" className="google-logo" />
        <span>Fazer login com o Google</span>
    </button>
    <form action="#">
        <input type="text" className="input-field" placeholder="Username" required />
        <input type="password" className="input-field" placeholder="Password" required />
        <input type="submit" className="input-field submit-button" value="Avançar" />
    </form>
    <div className="signup-text">
    Não tem uma conta? <a href="#">Inscreva-se</a>
    </div>
    </div>
    </div>

  );
}

export default LoginForm;
