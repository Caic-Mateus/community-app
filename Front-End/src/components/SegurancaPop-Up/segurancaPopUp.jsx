import React from "react";
import "./segurancaPopUp.css";

const SegurancaPopUp = ({ closeModal }) => {
  return (
    <div className="modal-overlay-seguranca">
      <div className="modal-content-seguranca">
        <button onClick={closeModal} className="close-button-seguranca">
          &times;
        </button>

        <div className="privacidade-container-seguranca">
          <label className="label-privacidade-seguranca">Privacidade</label>
        </div>
        <div className="seguranca-container-seguranca">
          <h2 className="titulo-seguranca">Segurança</h2>

          <div className="form-seguranca">
            <div className="input-group-seguranca">
              <label>Email:</label>
              <input
                type="email"
                placeholder="seuemail@gmail.com"
                className="input-seguranca"
              />
            </div>

            <div className="input-group-seguranca">
              <label>Celular:</label>
              <input
                type="text"
                placeholder="(99) 99999-9999"
                className="input-seguranca"
              />
            </div>

            <div className="input-group-seguranca">
              <label>Senha:</label>
              <input
                type="password"
                placeholder="*****"
                className="input-seguranca"
              />
            </div>

            <div className="input-group-seguranca">
              <label>Confirmar senha:</label>
              <input
                type="password"
                placeholder="*****"
                className="input-seguranca"
              />
            </div>
          </div>

          <button className="botao-salvar-seguranca">Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
};

export default SegurancaPopUp;
