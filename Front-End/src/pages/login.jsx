import React, { useState } from "react";
import LoginForm from "../components/Login/login";
import "../components/Shared/app.css";

import AuthService from "../components/services/AuthServices";

const authService = new AuthService();

export function Login() {
  return (
    <>
      <div className="app-container">
        <div className="header">
          <img src="../../public/img/logo.png" alt="Imagem 1" />
        </div>
        <LoginForm authService={authService} />
      </div>
    </>
  );
}
