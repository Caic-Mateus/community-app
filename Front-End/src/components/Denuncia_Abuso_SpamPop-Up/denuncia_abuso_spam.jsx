import React, { useState } from "react";
import axios from "axios";
import "./denuncia_abuso_spam.css";

const uid = localStorage.getItem("uid");
const token = localStorage.getItem("token");

function Denunciar_Abuso_Spam({ closeModal }) {
  const [descricao, setDescricao] = useState("");
  const [usuario, setUsuario] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao || !usuario) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/report/create", // URL do backend
        {
          denunciaText: descricao,
          denouncedUserName: usuario,
          denouncerUserId: uid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Inclui o token no cabeçalho
          },
        }
      );

      if (response.status === 200) {
        setSucesso(true);
        setDescricao("");
        setUsuario("");
        setErro(null);
        setTimeout(() => closeModal(), 2000); // Fecha o modal após 2 segundos
      } else {
        setErro(response.data.message || "Erro ao enviar a denúncia.");
      }
    } catch (error) {
      setErro("Erro ao enviar a denúncia.");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay-denunciar">
      <div className="modal-content-denunciar">
        <button onClick={closeModal} className="close-button-denunciar">
          &times;
        </button>
        <h2 className="titulo-denunciar">Denunciar Abuso/Spam</h2>

        {erro && <div className="erro-denunciar">{erro}</div>}
        {sucesso && <div className="sucesso-denunciar">Denúncia enviada com sucesso!</div>}

        <form onSubmit={handleSubmit}>
          <label className="label-denunciar">Descrição do Abuso/Spam:</label>
          <textarea
            className="input-textarea-denunciar"
            placeholder="Descreva a situação..."
            value={descricao}
            onChange={handleDescricaoChange}
          />

          <label className="label-denunciar">Nome do Usuário:</label>
          <input
            type="text"
            className="input-denunciar"
            placeholder="Digite o nome do usuário..."
            value={usuario}
            onChange={handleUsuarioChange}
          />

          <button type="submit" className="submit-button-denunciar">
            Enviar Denúncia
          </button>
        </form>
      </div>
    </div>
  );
}

export default Denunciar_Abuso_Spam;
