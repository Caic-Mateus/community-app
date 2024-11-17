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
            Como faço para fazer uma postagem?
          </h3>
          <p className="faq-resposta-perguntas">
            Assim que você realizar o login será redirecionado para a tela do
            Feed, nesta tela terá uma caixa de texto onde você podera digitar,
            após digitar o que você deseja, basta clicar no botão de "Postar" ao
            lado da caixa de texto e pronto, sua postagem foi realizada.
          </p>
        </div>

        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            Como faço para enviar uma mensagem?
          </h3>
          <p className="faq-resposta-perguntas">
            Assim que você realizar o login será redirecionado para a tela do
            Feed, nesta tela tera algumas opções a sua esquerda, clicando na
            opção de "Mensagens" você será redirecionadopara a tela de
            mensagens, onde existe uma caixa de texto que você ira colocar o
            nome do usuario para quem vocêdeseja enviar a mensagem, após isto, a
            tela do chat será aberta e você poderá digitar a sua mensagem e
            enviar clicando no botão "Enviar".
          </p>
        </div>

        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            Como faço para alterar minha senha?
          </h3>
          <p className="faq-resposta-perguntas">
            Se você esqueceu sua senha, clique em "Esqueci minha senha" na
            página de login. Insira seu e-mail registrado e enviaremos um link
            para você redefinir sua senha.
          </p>
        </div>

        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            Como posso seguir ou deixar de seguir outro usuário?
          </h3>
          <p className="faq-resposta-perguntas">
            Para seguir um usuário, visite o perfil dele e clique no botão
            "Seguir". Para deixar de seguir, clique no botão "Deixar de seguir"
            no perfil do usuário que você não deseja mais seguir.
          </p>
        </div>

        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            Como posso denunciar um comportamento inadequado?
          </h3>
          <p className="faq-resposta-perguntas">
            Se você encontrar um comportamento inadequado, clique na opção "Mais
            Opções" na esquerda da tela, lá terá a opção de realizar uma
            denuncia.
          </p>
        </div>
        <div className="faq-item-perguntas">
          <h3 className="faq-pergunta-perguntas">
            Como posso reportar um BUG?
          </h3>
          <p className="faq-resposta-perguntas">
            Se você encontrar um BUG, clique na opção "Mais Opções" na esquerda
            da tela, lá terá a opção de realizar um reporte de erro.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Perguntas_frequentes;
