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
            <li><a href="adm">Dashboard</a></li>
            <li><a href="/users">Usuários</a></li>
            <li><a href="#">Relatórios</a></li>
            <li><a href="#" onClick={() => authService.logout()}>Sair</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <p className="dashboard-title">Dashboard de Administrador</p>

       
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
