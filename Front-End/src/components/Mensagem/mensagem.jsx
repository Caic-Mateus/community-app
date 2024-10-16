import React from "react";
import "./mensagem.css";

const MensagemForm = () => {
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
    <div className="container-mensagem">
      <div className="sidebar-mensagem">
        <img
          src="../../public/img/Ft_cu.png"
          alt="Google Logo"
          className="commu-logo-mensagem"
        />
        <ul>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/HomePage.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Página inicial</span>
          </a>
          <a href="http://localhost:5173/notificacao">
            <img
              src="../../public/img/Notify.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/mensagens">
            <img
              src="../../public/img/Message.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Mensagens</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Save.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/perfil">
            <img
              src="../../public/img/Profile.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/More.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Mais</span>
          </a>
          <button onClick={logout}>
            <img
              src="../../public/img/Logout.png"
              className="homePage-logo-mensagem"
            ></img>
            Sair
          </button>
        </ul>
      </div>

      <main className="content-mensagem">
        <div className="search-mensagem">
          <input type="text" placeholder="Buscar" />
        </div>
        <ul className="lista-mensagem">
          <li className="item-mensagem">
            <span className="nome-mensagem">Calebe Silva Costa</span>
            <span className="curso-mensagem">
              Análise e Desenvolvimento de Sistemas
            </span>
            <span className="tempo-mensagem">50 min</span>
            <p className="texto-mensagem">
              Eai Borel, blz mn? Você fez a atividade do Gallao? kkkk não to
              consegu...
            </p>
          </li>
          <li className="item-mensagem active-mensagem">
            <span className="nome-mensagem">Melissa Nascimento</span>
            <span className="curso-mensagem">
              Análise e Desenvolvimento de Sistemas
            </span>
            <span className="tempo-mensagem">1 h</span>
            <p className="texto-mensagem">
              Muito Obrigado Lucas, vou enviar o PDF para o Viotti à noite.
            </p>
          </li>
          <li className="item-mensagem">
            <span className="nome-mensagem">
              Diretoria | Fatec SCS - Antonio Russo
            </span>
            <span className="tempo-mensagem">2 h</span>
            <p className="texto-mensagem">
              Gostaria de saber se o Humberto estará presente amanhã?
            </p>
          </li>
          <li className="item-mensagem">
            <span className="nome-mensagem">Guilherme Nunes</span>
            <span className="curso-mensagem">Segurança da Informação</span>
            <span className="tempo-mensagem">2 h</span>
            <p className="texto-mensagem"></p>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default MensagemForm;
