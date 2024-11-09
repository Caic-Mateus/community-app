import React, { useState } from "react";
import "./maisOpcoes.css";
import SegurancaPopUp from "../components/SegurancaPop-Up/segurancaPopUp";
import Perguntas_frequentes from "../components/Perguntas_frequentes/perguntas_frequentes";
import Denuncia from "../components/DenunciaPopUp/denuncia";

function MaisOpcoesForm() {
  const [isSegurancaOpen, setIsSegurancaOpen] = useState(false);
  const [isPerguntasOpen, setIsPerguntasOpen] = useState(false);
  const [isDenunciaOpen, setIsDenunciaOpen] = useState(false);

  const openSeguranca = () => setIsSegurancaOpen(true);
  const closeSeguranca = () => setIsSegurancaOpen(false);

  const openPerguntas = () => setIsPerguntasOpen(true);
  const closePerguntas = () => setIsPerguntasOpen(false);

  const openDenuncia = () => setIsDenunciaOpen(true);
  const closeDenuncia = () => setIsDenunciaOpen(false);

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
          <div className="seguranca-mais">
            <button onClick={openSeguranca}>
              <img
                src="../../public/img/seguranca.png"
                className="homePage-logo-mais"
              ></img>
              <span>Privacidade e Segurança</span>
            </button>
          </div>
          <div className="ajuda-mais">
            <button onClick={openPerguntas}>
              <img
                src="../../public/img/ajuda.png"
                className="homePage-logo-mais"
              ></img>
              <span>Ajuda</span>
            </button>
          </div>
          <div className="denuncia-mais">
            <button onClick={openDenuncia}>
              <img
                src="../../public/img/denuncia.png"
                className="homePage-logo-mais"
              ></img>
              <span>Denuncias</span>
            </button>
          </div>
          <div className="sair-mais">
            <button onClick={logout}>
              <img
                src="../../public/img/Logout.png"
                className="homePage-logo-mais"
              ></img>
              <span>Sair</span>
            </button>
          </div>
        </section>
      </main>
      {isSegurancaOpen && <SegurancaPopUp closeModal={closeSeguranca} />}
      {isPerguntasOpen && <Perguntas_frequentes closeModal={closePerguntas} />}
      {isDenunciaOpen && <Denuncia closeModal={closeDenuncia} />}
    </div>
  );
}
export default MaisOpcoesForm;
