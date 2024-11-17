import React from "react";
import ItensSalvosForm from "../Itens_Salvos/itensSalvos";
import AuthService from "../components/services/AuthServices";

const authService = new AuthService();

export function ItensSalvos() {
  return (
    <>
      <div>
        <ItensSalvosForm authService={authService} />
      </div>
    </>
  );
}
