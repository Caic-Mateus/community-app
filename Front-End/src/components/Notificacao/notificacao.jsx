import React from "react";
import "./notificacao.css";

function NotificacaoForm() {
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
          src="../../public/img/logo.png"
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
          <a href="http://localhost:5173/notificacao">
            <img
              src="../../public/img/Notify.png"
              alt="Notificações"
              className="homePage-logo-notificacao"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/mensagens">
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
          <a href="http://localhost:5173/perfil">
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
      <div className="notificacao">
        <div className="header-notificacao">
          <h1>Notificações</h1>
          <div className="filtro-notificacao">
            <button className="buttonAll-notificacao">Tudo</button>
            <button className="buttonNoAll-notificacao">Não vistas</button>
          </div>
        </div>
        <section className="nao-visto-notificacao">
          <h3>Não visto</h3>
          <ul className="lista-notificacao">
            <li className="item-notificacao">
              <span className="nome-notificacao">Calebe Silva Costa</span>
              <span className="tempo-notificacao">30 min</span>
              <span className="curso-notificacao">
                Análise e Desenvolvimento de Sistemas
              </span>
              <p className="texto-notificacao">
                Meu MySQL não está funcionando alguém pode me ajudar?? ERROR:
                Too Many Conections
              </p>
            </li>
            <li className="item-notificacao">
              <span className="nome-notificacao">Melissa Nascimento</span>
              <span className="tempo-notificacao">1 h</span>
              <span className="curso-notificacao">
                Análise e Desenvolvimento de Sistemas
              </span>
              <p className="texto-notificacao">
                Até que enfim consegui entender 🙏. Quem precisar de ajuda é só
                me chamar kkkkk.
              </p>
            </li>
          </ul>
        </section>
        <section className="visto-notificacao">
          <h3>Visto</h3>
          <ul className="lista-notificacao">
            <li className="item-notificacao">
              <span className="nome-notificacao">
                Diretoria | Fatec SCS - Antonio Russo
              </span>
              <span className="tempo-notificacao">2 h</span>
              <p className="texto-notificacao">
                Oportunidade de Estágio ~{" "}
                <a href="https://99jobs.com/">https://99jobs.com/</a>
              </p>
            </li>
            <li className="item-notificacao">
              <span className="nome-notificacao">
                Diretoria | Fatec SCS - Antonio Russo
              </span>
              <span className="tempo-notificacao">2 h</span>
              <p className="texto-notificacao">
                Oportunidade de Trainee ~{" "}
                <a href="https://www.nube.com.br/estudantes/vagas">
                  https://www.nube.com.br/estudantes/vagas
                </a>
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default NotificacaoForm;
