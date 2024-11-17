import React from "react";
import "../components/Shared/app.css";
import MensagemForm from "../components/Mensagem/mensagem";
import AuthService from "../components/services/AuthServices";

const authService = new AuthService();

export function Mensagem() {
  return (
    <>
      <div>
        <MensagemForm authService={authService} />
      </div>
    </>
  );
}
