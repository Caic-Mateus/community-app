import React, { useState } from "react";
import axios from "axios"; // Usaremos o axios para fazer a requisição
import "./reportar_erro.css";

const uid = localStorage.getItem("uid");
const token = localStorage.getItem("token");

function Reportar_Erro({ closeModal }) {
  const [descricaoErro, setDescricaoErro] = useState(""); // Estado para a descrição do erro
  const [loading, setLoading] = useState(false); // Estado para controle do carregamento

  // Função para manipular o texto da descrição do erro
  const handleDescricaoChange = (event) => {
    setDescricaoErro(event.target.value);
  };

  // Função para enviar o erro para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricaoErro) {
      alert("Por favor, descreva o erro.");
      return;
    }

    setLoading(true); // Inicia o carregamento enquanto envia a requisição

    try {
      // Enviar o erro para o backend
      await axios.post("http://localhost:3000/bug/create", {
        bugDescription: descricaoErro,
        reporterUserId: uid, // Assumindo que o userId é passado como prop
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Inclui o token no cabeçalho
        },
      });

      alert("Erro reportado com sucesso!");
      closeModal(); // Fecha o modal após o envio
    } catch (error) {
      console.error("Erro ao reportar o bug:", error);
      alert("Ocorreu um erro ao reportar o bug. Tente novamente.");
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="modal-overlay-reportar">
      <div className="modal-content-reportar">
        <button onClick={closeModal} className="close-button-reportar">
          &times;
        </button>
        <h2 className="titulo-reportar">Reportar Erro</h2>

        <form onSubmit={handleSubmit}>
          <label className="label-reportar">Descrição do Erro:</label>
          <textarea
            className="input-textarea-reportar"
            placeholder="Descreva o erro encontrado..."
            value={descricaoErro}
            onChange={handleDescricaoChange}
          />

          <button
            type="submit"
            className="submit-button-reportar"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reportar_Erro;
