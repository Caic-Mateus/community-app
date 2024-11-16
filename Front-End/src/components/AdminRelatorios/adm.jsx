import React, { useState } from "react";
import "./adm.css";
import axios from "axios";
import PropTypes from "prop-types";

function Administrador({ authService }) {
  const [isBugsModalOpen, setIsBugsModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [bugs, setBugs] = useState([]); // Estado para armazenar os bugs
  const [reports, setReports] = useState([]); // Estado para armazenar as denúncias
  const [loadingBugs, setLoadingBugs] = useState(false); // Estado de carregamento de bugs
  const [loadingReports, setLoadingReports] = useState(false); // Estado de carregamento de denúncias
  const [errorBugs, setErrorBugs] = useState(null); // Estado de erro de bugs
  const [errorReports, setErrorReports] = useState(null); // Estado de erro de denúncias

  const toggleBugsModal = async () => {
    if (!isBugsModalOpen) {
      // Buscar os bugs ao abrir o modal
      setLoadingBugs(true);
      setErrorBugs(null);
      try {
        const response = await axios.get("http://localhost:3000/bug/list");
        setBugs(response.data); // Salva os bugs no estado
      } catch (err) {
        setErrorBugs("Erro ao carregar os bugs");
      } finally {
        setLoadingBugs(false);
      }
    }
    setIsBugsModalOpen(!isBugsModalOpen);
  };

  const toggleReportsModal = async () => {
    if (!isReportsModalOpen) {
      // Buscar as denúncias ao abrir o modal
      setLoadingReports(true);
      setErrorReports(null);
      try {
        const response = await axios.get("http://localhost:3000/report/list");
        setReports(response.data); // Salva as denúncias no estado
      } catch (err) {
        setErrorReports("Erro ao carregar as denúncias");
      } finally {
        setLoadingReports(false);
      }
    }
    setIsReportsModalOpen(!isReportsModalOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <p className="sidebar-welcome">Bem-vindo, Administrador!</p>
        <div className="sidebar-links">
          <ul>
            <li><a href="/adm">Dashboard</a></li>
            <li><a href="/users">Usuários</a></li>
            <li><a href="#">Relatórios</a></li>
            <li><a href="#" onClick={() => authService.logout()}>Sair</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <p className="dashboard-title">Relatórios do Adm</p>

        {/* Cards */}
        <div className="dashboard-cards-center">
          <div className="card" onClick={toggleBugsModal}>
            <p className="card-text">BUGS</p>
          </div>
          <div className="card" onClick={toggleReportsModal}>
            <p className="card-text">DENÚNCIAS</p>
          </div>
        </div>

        {/* Bugs Modal */}
        {isBugsModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Lista de BUGS</h2>
              {loadingBugs ? (
                <p>Carregando...</p>
              ) : errorBugs ? (
                <p className="error-text">{errorBugs}</p>
              ) : (
                <ul className="bugs-list">
                  {bugs.map((bug) => (
                    <li key={bug.id}>
                      <strong>Bug</strong>: {bug.bugDescription}
                    </li>
                  ))}
                </ul>
              )}
              <button className="close-button" onClick={toggleBugsModal}>
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Reports Modal */}
        {isReportsModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Lista de DENÚNCIAS</h2>
              {loadingReports ? (
                <p>Carregando...</p>
              ) : errorReports ? (
                <p className="error-text">{errorReports}</p>
              ) : (
                <ul className="reports-list">
                  {reports.map((report) => (
                    <li key={report.id}>
                      <strong>Denuncia: {report.denunciaText}</strong> Usuário denunciado: {report.denouncedUserName}
                    </li>
                  ))}
                </ul>
              )}
              <button className="close-button" onClick={toggleReportsModal}>
                Fechar
              </button>
            </div>
          </div>
        )}
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
