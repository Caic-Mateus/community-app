import React, { useState } from "react";
import "./denuncia.css";
import Reportar_Erro from "../Reportar_ErroPop-Up/reportar_erro";
import Denunciar_Abuso_Spam from "../Denuncia_Abuso_SpamPop-Up/denuncia_abuso_spam";

function Denuncia({ closeModal }) {
  const [isReportarErroOpen, setIsReportarErroOpen] = useState(false);
  const [isDenunciarAbusoSpamOpen, setIsDenunciarAbusoSpamOpen] =
    useState(false);

  const openReportarErro = () => setIsReportarErroOpen(true);
  const closeReportarErro = () => setIsReportarErroOpen(false);

  const openDenunciarAbusoSpam = () => setIsDenunciarAbusoSpamOpen(true);
  const closeDenunciarAbusoSpam = () => setIsDenunciarAbusoSpamOpen(false);
  return (
    <div className="modal-overlay-denuncia">
      <div className="modal-content-denuncia">
        <button onClick={closeModal} className="close-button-denuncia">
          &times;
        </button>
        <h2 className="titulo-denuncia">Denúncia</h2>

        <div className="caixa-suporte-denuncia">
          <h3 className="subtitulo-denuncia">Caixa de Entrada de Suporte</h3>
          <div className="item-denuncia">
            <span>Denúncias sobre outras pessoas</span>
            <span>0 Denúncias</span>
          </div>
        </div>

        <hr className="separador-denuncia" />

        <div className="relatar-problema-denuncia">
          <h3 className="subtitulo-denuncia">Relatar um Problema</h3>
          <div className="item-denuncia">
            <button onClick={openReportarErro}>Reportar Erro</button>
          </div>
          <div className="item-denuncia">
            <button onClick={openDenunciarAbusoSpam}>
              Denunciar sobre abuso ou spam
            </button>
          </div>
        </div>
      </div>
      {isReportarErroOpen && <Reportar_Erro closeModal={closeReportarErro} />}
      {isDenunciarAbusoSpamOpen && (
        <Denunciar_Abuso_Spam closeModal={closeDenunciarAbusoSpam} />
      )}
    </div>
  );
}

export default Denuncia;
