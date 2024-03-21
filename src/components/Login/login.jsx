import React from 'react';
import './login.css'

function LoginForm() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form action="#">
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginForm;
