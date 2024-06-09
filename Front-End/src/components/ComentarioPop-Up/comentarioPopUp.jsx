import React, { useState } from 'react';
import './comentarioPopUp.css';

const CommentPopup = ({ isOpen, onClose, onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(comment);
        setComment('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
            <div className='postsPop'>
                <div className='postPop'>
                <div className="user">
                    <img src="https://via.placeholder.com/40" alt='Usuario' />
                        <div className="info">
                            <div className="name">Usuario</div>
                            <div className="name">Curso</div>
                            <div className="name">Conteudo</div>
                            <div className="time">Data do post</div>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                    <div className='comments'>
                        <div className='allcomments'>
                            <p>comentarios aqui</p>
                        </div>
                    </div>
                </div>
            </div>
                <h2>Comentar na Publicação</h2>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Escreva seu comentário aqui..."
                />
                <div className="popup-actions">
                    <button onClick={handleSubmit}>Enviar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default CommentPopup;
