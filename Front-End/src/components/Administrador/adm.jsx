import React, { useState, useEffect } from "react";
import "./adm.css";
import axios from "axios";
import PropTypes from "prop-types";
import Loading from "../loading/loading";

function Administrador({ authService }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    users: 0,
    posts: 0,
    comments: 0,
    likes: 0,
    bugs: 0,
    reports: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              <div className="card-number">{data.totalUsers}</div>
              <p className="card-text">Usuários Cadastrados</p>
            </div>
            <div className="card">
              <div className="card-number">{data.totalPosts}</div>
              <p className="card-text">Posts Recentes</p>
            </div>
            <div className="card">
              <div className="card-number">{data.totalDenuncias}</div>
              <p className="card-text">Denúncias Pendentes</p>
            </div>
          </div>

          <div className="card-group">
            <div className="card">
              <div className="card-number">{data.totalComments}</div>
              <p className="card-text">Comentários Feitos</p>
            </div>
            <div className="card">
              <div className="card-number">{data.totalLikes}</div>
              <p className="card-text">Interações Recentes</p>
            </div>
            <div className="card">
              <div className="card-number">{data.totalBugs}</div>
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
