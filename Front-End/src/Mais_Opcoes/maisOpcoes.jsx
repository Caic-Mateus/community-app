import React, { useState } from "react";
import "./maisOpcoes.css";

function MaisOpcoesForm() {
  const [showEditPerfil, setShowEditPerfil] = useState(false);

  const handleOpenPopup = () => {
    setShowEditPerfil(true);
  };

  const handleClosePopup = () => {
    setShowEditPerfil(false);
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      setIsLoggingOut(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };
  return (
    <div className="container-mais">
      <div className="sidebar-mais">
        <img
          src="../../public/img/logo.png"
          alt="Google Logo"
          className="commu-logo-mais"
        />
        <ul>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/HomePage.png"
              alt="HomePage Logo"
              className="homePage-logo-mais"
            />
            <span>Página inicial</span>
          </a>
          <a href="http://localhost:5173/notificacao">
            <img
              src="../../public/img/Notify.png"
              alt="HomePage Logo"
              className="homePage-logo-mais"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/mensagens">
            <img
              src="../../public/img/Message.png"
              alt="HomePage Logo"
              className="homePage-logo-mais"
            />
            <span>Mensagens</span>
          </a>
          <a href="http://localhost:5173/itensSalvos">
            <img
              src="../../public/img/Save.png"
              alt="HomePage Logo"
              className="homePage-logo-mais"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/perfil">
            <img
              src="../../public/img/Profile.png"
              alt="HomePage Logo"
              className="homePage-logo-mais"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/More.png"
              alt="HomePage Logo"
              className="homePage-logo-mais"
            />
            <span>Mais</span>
          </a>
          <a onClick={logout}>
            <img
              src="../../public/img/Logout.png"
              className="homePage-logo-mais"
            ></img>
            Sair
          </a>
        </ul>
      </div>

      <main className="content-mais">
        <header className="header-mais">
          <h2>Configurações</h2>
        </header>
        <section className="settings-mais">
          <div className="settings-item-mais">
            <i className="icon-security-mais"></i>
            <span>Privacidade e Segurança</span>
          </div>
          <div className="settings-item-mais">
            <i className="icon-help-mais"></i>
            <span>Ajuda</span>
          </div>
          <div className="settings-item-mais">
            <i className="icon-logout-mais"></i>
            <span>Sair</span>
          </div>
        </section>
      </main>
    </div>
  );
}
export default MaisOpcoesForm;
