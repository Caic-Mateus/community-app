import React, { useState, useEffect } from "react";
import "./edit_perfilPop-Up.css";

const Edit_perfilPopUp = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    date_Nasc: "",
  });

  // Preencher o formulário com os dados do usuário ao abrir o modal
  useEffect(() => {
    console.log(userData)
    if (isOpen && userData) {
      setFormData({
        name: userData.name || "",
        user: userData.user        || "",
        date_Nasc: userData.date_Nasc || "",
      });
    }
  }, [isOpen, userData]);

  // Atualizar o estado com as mudanças do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar os dados para o backend
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Passa os dados para o componente pai
    onClose(); // Fecha o modal após salvar
  };

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
              src={userData.avatarUrl != null ? userData.avatarUrl : "https://via.placeholder.com/80" }
              alt="User Avatar"
              className="avatar-edit-perfil"
            />
            <form className="form-edit-perfil" onSubmit={handleSubmit}>
              <label className="label-edit-perfil">Nome completo:</label>
              <input
                type="text"
                name="name"
                className="input-edit-perfil"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome completo"
              />

              <div className="username-birthdate-edit-perfil">
                <div>
                  <label className="label-edit-perfil">Nome de usuário:</label>
                  <input
                    type="text"
                    name="user"
                    className="input-edit-perfil"
                    value={formData.user}
                    onChange={handleChange}
                    placeholder="@nome_usuario"
                  />
                </div>
                <div>
                  <label className="label-edit-perfil">Data de nascimento:</label>
                  <input
                    type="text"
                    name="date_Nasc"
                    className="input-edit-perfil"
                    value={formData.date_Nasc}
                    onChange={handleChange}
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
