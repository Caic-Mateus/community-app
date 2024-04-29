import React from 'react';
import './feed.css'

function FeedIndex() {
  return (
    <div className='feedContainer'>
      <div className='feedStart'>
      <p>Página inicial</p>
      <p>Notificações</p>
      <p>Mensagens</p>
      <p>Itens salvos</p>
      <p>Perfil</p>
      <p>Mais</p>
      </div>
      <div className='feedTop'>
        <p>O que está pensando?</p>
      </div>
    </div>
  );
}

export default FeedIndex;
