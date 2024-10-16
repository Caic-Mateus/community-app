import React from "react";
import "./mensagem.css";

const MensagemForm = () => {
  return (
    <div className="container-mensagem">
      <aside className="sidebar-mensagem">
        <div className="logo-mensagem">
          <img src="logo_url" alt="Commu Unity Logo" />
        </div>
        <ul className="menu-mensagem">
          <li>Página inicial</li>
          <li>Notificações</li>
          <li className="active-mensagem">Mensagens</li>
          <li>Itens salvos</li>
          <li>Perfil</li>
          <li>Mais</li>
        </ul>
        <div className="user-info-mensagem">
          <img src="user_image_url" alt="Lucas Borel" />
          <p>Lucas Borel</p>
          <p>lucas@fatec.com</p>
        </div>
      </aside>

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
