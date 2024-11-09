import React from "react";
import "./perguntas_frequentes.css";

function Perguntas_frequentes({ closeModal }) {
  return (
    <div className="modal-overlay-perguntas">
      <div className="modal-content-perguntas">
        <button onClick={closeModal} className="close-button-perguntas">
          &times;
        </button>
        <h2 className="titulo-perguntas">Perguntas Frequentes</h2>

        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            Como faço para alterar minha senha?
          </h3>
          <p className="faq-resposta-perguntas">
            Você pode alterar sua senha acessando as configurações de segurança
            na sua conta.
          </p>
        </div>

        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            Como posso tornar minha conta privada?
          </h3>
          <p className="faq-resposta-perguntas">
            Vá até a seção de privacidade nas configurações e ative a opção de
            conta privada.
          </p>
        </div>

        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            O que faço se esquecer meu email de login?
          </h3>
          <p className="faq-resposta-perguntas">
            Entre em contato com o suporte para obter assistência com a
            recuperação de conta.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Perguntas_frequentes;
