import React from 'react';
import './feed.css'

function FeedIndex() {
  return (
    <div className='feedContainer'>
       <div className='LineUnique'>
        <p className='Text'>O que está pensando?</p>
        <input className='input' type="text" />
      </div>
      <div className='Options'>
        <list>
          <button className='Button'>Pagina inicial</button>
          <button className='Button'>Notificações</button>
          <button className='Button'>Mensagens</button>
          <button className='Button'>Itens Salvos</button>
          <button className='Button'>Mais</button>
        </list>
      </div>
      <div className='Feed'>
        <h1>Postagens Aqui</h1>
      </div>
    </div>

  );
}

export default FeedIndex;
