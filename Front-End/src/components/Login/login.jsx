import React, { useState } from "react";
import "./login.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthServices";
import Loading from "../loading/loading";

function LoginForm({ authService }) {
  const [form, setForm] = useState({
    email: {
      hasChanged: false,
      value: "",
    },
    password: {
      hasChanged: false,
      value: "",
    },
  });

  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showRecoverPasswordMessage, setShowRecoverPasswordMessage] =
    useState(false);

  const recoverPassword = () => {
    setShowLoading(true);
    authService
      .recoverPassword(form.email.value)
      .then(() => {
        setShowRecoverPasswordMessage(true);
        setShowLoading(false);
      })
      .catch((error) => {
        setError(error);
        setShowLoading(false);
      });
  };

  LoginForm.propTypes = {
    authService: PropTypes.shape({
      login: PropTypes.func.isRequired,
      recoverPassword: PropTypes.func.isRequired,
    }).isRequired,
  };

  const navigate = useNavigate();

  const login = () => {
    // Verificando se o email e a senha são os dados do admin
    if (form.email.value === "admin@admin.com" && form.password.value === "123456") {
      navigate("/adm"); // Redireciona para a página de administrador
    } else {
      // Caso contrário, continua o fluxo normal de login
      authService
        .login(form.email.value, form.password.value)
        .then(() => {
          navigate("/feed"); // Redireciona para a página de feed
        })
        .catch((error) => {
            setError("E-mail e/ou senha estão incorretos."); // Define a mensagem de erro
         
        });
    }
  };
  

  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="login-container-login">
      <div className="container-login">
        <div className="header">
          <img src="../../public/img/logo.png" alt="Imagem 1" />
        </div>
        <form action="#" className="form-login">
  <input
    type="email"
    className="input-field-login"
    placeholder="E-mail"
    value={form.email.value}
    onChange={(event) =>
      setForm({
        ...form,
        email: {
          hasChanged: true,
          value: event.target.value,
        },
      })
    }
    required
  />
  {form.email.hasChanged && !form.email.value && (
    <div className="inputvalidation-login">Email é obrigatório</div>
  )}
  {form.email.hasChanged && !isEmailValid(form.email.value) && (
    <div className="inputvalidation-login">Email é inválido</div>
  )}
  <input
    type="password"
    className="input-field-login"
    placeholder="Password"
    value={form.password.value}
    onChange={(event) =>
      setForm({
        ...form,
        password: {
          hasChanged: true,
          value: event.target.value,
        },
      })
    }
    required
  />
  {form.password.hasChanged && !form.password.value && (
    <div className="inputvalidation-login">Senha é obrigatória</div>
  )}
  <button
    type="button"
    className="submit-button-login"
    disabled={!isEmailValid(form.email.value) || !form.password.value}
    onClick={login}
  >
    Entrar
  </button>
  {error && <div className="inputvalidation-login">{error}</div>}
</form>

        <div className="signup-text-login">
          <a
            type="button"
            className="signup-text-login"
            disable={!isEmailValid(form.email.value)}
            onClick={recoverPassword}
          >
            Recuperar Senha
          </a>
          <div className="signup-text-login">
            <p>Não tem uma conta?</p>
            <a href="http://localhost:5173/cadastro">Inscreva-se</a>
            {showLoading && <Loading />}
            {showRecoverPasswordMessage && (
              <div className="signup-text-login">
                <p>Verifique sua caixa de email!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
