import React, { useState } from "react";
import LoginForm from "../components/Login/login";
import "../components/Shared/app.css";

import AuthService from "../components/services/AuthServices";

const authService = new AuthService();

export function Login() {
  return (
    <>
      <LoginForm authService={authService} />
    </>
  );
}
