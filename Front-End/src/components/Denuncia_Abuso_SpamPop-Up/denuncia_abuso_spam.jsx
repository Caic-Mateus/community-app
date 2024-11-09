import React from "react";
import "./denuncia_abuso_spam.css";

function Denunciar_Abuso_Spam({ closeModal }) {
  return (
    <div className="modal-overlay-denunciar">
      <div className="modal-content-denunciar">
        <button onClick={closeModal} className="close-button-denunciar">
          &times;
        </button>
        <h2 className="titulo-denunciar">Denunciar Abuso/Spam</h2>

        <label className="label-denunciar">Descrição do Abuso/Spam:</label>
        <textarea
          className="input-textarea-denunciar"
          placeholder="Descreva a situação..."
        />

        <label className="label-denunciar">Nome do Usuário:</label>
        <input
          type="text"
          className="input-denunciar"
          placeholder="Digite o nome do usuário..."
        />

        <button className="submit-button-denunciar">Enviar Denúncia</button>
      </div>
    </div>
  );
}

export default Denunciar_Abuso_Spam;
