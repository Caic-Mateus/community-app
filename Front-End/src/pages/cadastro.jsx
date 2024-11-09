import React from "react";
import CadastroForm from "../components/Cadastro/cadastro";
import "../components/Shared/app.css";

export function Cadastro() {
  return (
    <>
      <div className="app-container">
        <div className="header">
          <img src="../../public/img/logo.png" alt="Imagem 1" />
        </div>
        <CadastroForm />
      </div>
    </>
  );
}
