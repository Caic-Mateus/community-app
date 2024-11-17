import React from "react";
import MaisOpcoesForm from "../Mais_Opcoes/maisOpcoes";
import AuthService from "../components/services/AuthServices";

const authService = new AuthService();

export function MaisOpcoes() {
  return (
    <>
      <div>
        <MaisOpcoesForm authService={authService} />
      </div>
    </>
  );
}
