import React, { useState, useEffect } from "react";
import "./adm.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../loading/loading";
import CommentPopup from "../ComentarioPop-Up/comentarioPopUp";
import Edit_perfilPopUp from "../Edit_Perfil_Pop-Up/edit_perfilPop-Up";

function Administrador({ authService }) {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  function formatDate(timestamp) {
    const date = timestamp ? new Date(timestamp._seconds * 1000) : null;
    return date ? date.toLocaleDateString() : "Data Desconhecida";
  }

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <p className="sidebar-welcome">Bem-vindo, Administrador!</p>
        <div className="sidebar-links">
          <ul>
            <li><a href="/adm">Dashboard</a></li>
            <li><a href="/users">Usuários</a></li>
            <li><a href="/admRelat">Relatórios</a></li>
            <li><a href="#" onClick={() => authService.logout()}>Sair</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <p className="dashboard-title">Dashboard de Administrador</p>

        <div className="dashboard-cards">
          <div className="card-group">
            <div className="card">
              <div className="card-number">120</div>
              <p className="card-text">Usuários Cadastrados</p>
            </div>
            <div className="card">
              <div className="card-number">45</div>
              <p className="card-text">Posts Recentes</p>
            </div>
            <div className="card">
              <div className="card-number">8</div>
              <p className="card-text">Denúncias Pendentes</p>
            </div>
          </div>

          <div className="card-group">
            <div className="card">
              <div className="card-number">200</div>
              <p className="card-text">Comentários Feitos</p>
            </div>
            <div className="card">
              <div className="card-number">300</div>
              <p className="card-text">Interações Recentes</p>
            </div>
            <div className="card">
              <div className="card-number">15</div>
              <p className="card-text">Erros Reportados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Administrador.propTypes = {
  authService: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }).isRequired,
};

export default Administrador;
