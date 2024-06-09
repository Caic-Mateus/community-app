import React, { useState, useEffect } from 'react';
import './comentarioPopUp.css';
import axios from 'axios';

const CommentPopup = ({ isOpen, onClose, post, onSubmit }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        if (isOpen && post) {
            fetchComments(post.postId);
        }
    }, [isOpen, post, updateFlag]);

    const fetchComments = async (postId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/comments/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            setComments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar os comentários:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const submitComment = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('uid');
            const newComment = {
                postId: post.postId,
                commentText: comment,
                userId: userId
            };
            const response = await axios.post('http://localhost:3000/comments', newComment, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            console.log('Novo comentário enviado:', response.data);
            onSubmit(); // Chama a função de retorno para atualizar os comentários no componente pai
            setComment('');
            setUpdateFlag(!updateFlag);
        } catch (error) {
            console.error('Erro ao enviar o comentário:', error);
            setError(error.message);
        }
    };

    const handleSubmit = () => {
        submitComment();
    };

    if (!isOpen || !post) return null;

    function formatDate(timestamp) {
        const date = timestamp ? new Date(timestamp._seconds * 1000) : null;
        return date ? date.toLocaleDateString() : 'Data Desconhecida';
    }

    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className='postsPop'>
                    <div className='postPop'>
                        <div className="user">
                            <img src="https://via.placeholder.com/40" alt={post.user ? post.user.name : 'Usuário Desconhecido'} />
                            <div className="info">
                                <div className="name">{post.user ? "@" + post.user.user : 'Usuário Desconhecido'}</div>
                                <div className="name">{post.user?.curso ? post.user.curso : 'Curso Desconhecido'}</div>
                                <div className="name">{post.context}</div>
                                <div className="time">{formatDate(post.registrationDate)}</div>
                            </div>
                        </div>
                        <div className='comments'>
                            <div className='allcomments'>
                                {loading ? (
                                    <p>Carregando comentários...</p>
                                ) : error ? (
                                    <p>Erro ao carregar comentários.</p>
                                ) : comments.length === 0 ? (
                                    <p>Não há comentários ainda.</p>
                                ) : (
                                    comments.map((comment, index) => (
                                        <div key={index} className="comment">
                                            <div className="user">
                                                <img src="https://via.placeholder.com/40" alt={comment.user ? comment.user.name : 'Usuário Desconhecido'} />
                                                <div className="info">
                                                    <div className="name">{comment.user ? "@" + comment.user.user : 'Usuário Desconhecido'}</div>
                                                    <div className="time">{formatDate(post.registrationDate)}</div>
                                                </div>
                                            </div>
                                            <div className="commentText">{comment.commentText}</div>
                                        </div>
                                    ))
                                )}
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
