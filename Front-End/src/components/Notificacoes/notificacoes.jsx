import React from "react";
import "./notificacoes.css";

function NotificacoesForm() {
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
    <div className="container-notificacao">
      <div className="sidebar-notificacao">
        <img
          src="../../public/img/Ft_cu.png"
          alt="Logo"
          className="commu-logo-notificacao"
        />
        <ul>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/HomePage.png"
              alt="HomePage Logo"
              className="homePage-logo-notificacao"
            />
            <span>Página inicial</span>
          </a>
          <a href="http://localhost:5173/notificacoes">
            <img
              src="../../public/img/Notify.png"
              alt="Notificações"
              className="homePage-logo-notificacao"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Message.png"
              alt="Mensagens"
              className="homePage-logo-notificacao"
            />
            <span>Mensagens</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Save.png"
              alt="Itens Salvos"
              className="homePage-logo-notificacao"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Profile.png"
              alt="Perfil"
              className="homePage-logo-notificacao"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/More.png"
              alt="Mais"
              className="homePage-logo-notificacao"
            />
            <span>Mais</span>
          </a>
          <button onClick={logout} className="botao-logout-notificacao">
            <img
              src="../../public/img/Logout.png"
              alt="Logout"
              className="homePage-logo-notificacao"
            />
            Sair
          </button>
        </ul>
      </div>
      <div className="main-notificacao">
        <h1>Notificações</h1>
        <div className="notificacoes-lista">
          {notificacoes.map((notificacao) => (
            <div className="notificacao-item" key={notificacao.id}>
              <p>{notificacao.mensagem}</p>
              <span>{new Date(notificacao.data).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificacoesForm;
