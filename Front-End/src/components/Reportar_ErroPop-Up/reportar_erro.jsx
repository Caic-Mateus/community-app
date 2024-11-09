import React from "react";
import "./reportar_erro.css";

function Reportar_Erro({ closeModal }) {
  return (
    <div className="modal-overlay-reportar">
      <div className="modal-content-reportar">
        <button onClick={closeModal} className="close-button-reportar">
          &times;
        </button>
        <h2 className="titulo-reportar">Reportar Erro</h2>

        <label className="label-reportar">Descrição do Erro:</label>
        <textarea
          className="input-textarea-reportar"
          placeholder="Descreva o erro encontrado..."
        />

        <label className="label-reportar">Anexar Print ou Vídeo:</label>
        <input
          type="file"
          accept="image/*,video/*"
          className="input-file-reportar"
        />

        <button className="submit-button-reportar">Enviar Reporte</button>
      </div>
    </div>
  );
}

export default Reportar_Erro;
