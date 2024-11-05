import React from "react";
import "./edit_perfilPop-Up.css";

const Edit_perfilPopUp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="overlay-edit-perfil">
      <div className="container-edit-perfil">
        <div className="header-edit-perfil">
          <button className="back-button-edit-perfil" onClick={onClose}>
            Voltar
          </button>
        </div>

        <div className="content-edit-perfil">
          <h1 className="title-edit-perfil">Editar Perfil</h1>
          <div className="profile-card-edit-perfil">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="avatar-edit-perfil"
            />
            <form className="form-edit-perfil">
              <label className="label-edit-perfil">Nome completo:</label>
              <input
                type="text"
                className="input-edit-perfil"
                placeholder="Nome completo"
              />

              <div className="username-birthdate-edit-perfil">
                <div>
                  <label className="label-edit-perfil">Nome de usuário:</label>
                  <input
                    type="text"
                    className="input-edit-perfil"
                    placeholder="@nome_usuario"
                  />
                </div>
                <div>
                  <label className="label-edit-perfil">
                    Data de nascimento:
                  </label>
                  <input
                    type="text"
                    className="input-edit-perfil"
                    placeholder="99/99/9999"
                  />
                </div>
              </div>

              <button type="submit" className="button-save-edit-perfil">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_perfilPopUp;
