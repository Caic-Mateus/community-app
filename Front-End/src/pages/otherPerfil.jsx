import React from "react";
import PerfilOtherForm from "../components/PerfilOther/otherPerfil";
import AuthService from "../components/services/AuthServices";

const authService = new AuthService();

export function PerfilOther() {
  return (
    <>
      <div>
        <PerfilOtherForm authService={authService} />
      </div>
    </>
  );
}
