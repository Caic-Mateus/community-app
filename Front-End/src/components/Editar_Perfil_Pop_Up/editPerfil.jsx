import React from "react";
import "./editPerfil.css";

function EditPerfil({ onClose }) {
  return (
    <div className="popup-overlay-editPerfil">
      <div className="popup-content-editPerfil">
        <div className="header-editPerfil">
          <h2>Editar Perfil</h2>
          <button className="close-button-editPerfil" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-container-editPerfil">
          <div className="avatar-container-editPerfil">
            <img src="avatar.png" alt="Avatar" className="avatar-editPerfil" />
          </div>
          <form>
            <div className="input-group-editPerfil">
              <label>Nome completo:</label>
              <input
                type="text"
                placeholder="Nome completo"
                className="input-editPerfil"
              />
            </div>
            <div className="input-group-editPerfil">
              <label>Nome de usuário:</label>
              <input
                type="text"
                placeholder="@nome_usuario"
                className="input-editPerfil"
              />
            </div>
            <div className="input-group-editPerfil">
              <label>Data de nascimento:</label>
              <input
                type="text"
                placeholder="99/99/9999"
                className="input-editPerfil"
              />
            </div>
            <button type="submit" className="save-button-editPerfil">
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPerfil;
