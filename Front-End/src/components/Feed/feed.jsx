import React, { useState, useEffect } from 'react';
import './feed.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../loading/loading';
import CommentPopup from '../ComentarioPop-Up/comentarioPopUp';
import AuthService from '../services/AuthServices';

function FeedIndex({ authService }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        fetchPosts();
    }, [updateFlag]); // Dependência adicionada aqui

    FeedIndex.propTypes = {
        authService: PropTypes.shape({
            login: PropTypes.func.isRequired,
            logout: PropTypes.func.isRequired,
            recoverPassword: PropTypes.func.isRequired,
        }).isRequired,
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/posts/allposts', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/');
            }
            console.error('Erro ao buscar os posts:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const logout = async () => {
        setIsLoggingOut(true);
        try {
            await authService.logout();
            setIsLoggingOut(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggingOut(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            const newLike = {
                userId: uid,
                postId: postId
            };
            const response = await axios.post(`http://localhost:3000/likes`, newLike, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            console.log('Like adicionado:', response.data);
            setUpdateFlag(!updateFlag); // Atualizar a flag aqui
        } catch (error) {
            console.error('Erro ao adicionar like:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const newPostData = {
                context: newPostContent,
                likesCount: 0,
                commentsCount: 0,
                userId: uid
            };
            const response = await axios.post('http://localhost:3000/posts', newPostData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            console.log('Novo post criado:', response.data);
            setNewPostContent('');
            setLoading(false);
            setUpdateFlag(!updateFlag); // Atualizar a flag aqui
        } catch (error) {
            console.error('Erro ao criar o novo post:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    
    const handleCommentSubmit = (comment) => {
        console.log("Comentário enviado:", comment);
        
    };

    function formatDate(timestamp) {
        const date = timestamp ? new Date(timestamp._seconds * 1000) : null; // Verifica se timestamp está definido
        return date ? date.toLocaleDateString() : 'Data Desconhecida'; // Verifica se date está definido
    }

    return (
        <div className="container">
            <div className="sidebar">
                <img src="../../public/img/Ft_cu.png" alt="Google Logo" className="commu-logo" />
                <ul>
                    <a href="http://localhost:5173/feed">
                        <img src="../../public/img/HomePage.png" alt="HomePage Logo" className='homePage-logo' />
                        <span>Página inicial</span>
                    </a>
                    <a href="http://localhost:5173/feed">
                        <img src="../../public/img/Notify.png" alt="HomePage Logo" className='homePage-logo' />
                        <span>Notificações</span>
                    </a>
                    <a href="http://localhost:5173/feed">
                        <img src="../../public/img/Message.png" alt="HomePage Logo" className='homePage-logo' />
                        <span>Mensagens</span>
                    </a>
                    <a href="http://localhost:5173/feed">
                        <img src="../../public/img/Save.png" alt="HomePage Logo" className='homePage-logo' />
                        <span>Itens Salvos</span>
                    </a>
                    <a href="http://localhost:5173/perfil">
                        <img src="../../public/img/Profile.png" alt="HomePage Logo" className='homePage-logo' />
                        <span>Perfil</span>
                    </a>
                    <a href="http://localhost:5173/feed">
                        <img src="../../public/img/More.png" alt="HomePage Logo" className='homePage-logo' />
                        <span>Mais</span>
                    </a>
                    <button className='botao-logout' onClick={logout}>
                        <img src='../../public/img/Logout.png' className='homePage-logo'></img>
                        Sair
                    </button>
                </ul>
            </div>
            <div className="main">
                <div className="header">
                    <div className="search-bar">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="O que está acontecendo?"
                                className="input-personalizado"
                                value={newPostContent}
                                onChange={(event) => setNewPostContent(event.target.value)}
                            />
                            <button type="submit" className="botao-sem-fundo" disabled={loading}>
                                {loading ? <Loading /> : 'Postar'}
                            </button>
                            <i className="fas fa-search"></i>
                        </form>
                    </div>
                </div>
                <div className="posts">
                    {posts.map(post => (
                        <div className="post" key={post.uid}>
                            <div className="user">
                                <img src="https://via.placeholder.com/40" alt={post.user ? post.user.name : 'Usuário Desconhecido'} />
                                <div className="info">
                                    <div className="name">{post.user ? "@"+ post.user.user : 'Usuário Desconhecido'}</div>
                                    <div className="name">{post.user?.curso ? post.user.curso : 'Curso Desconhecido'}</div>
                                    <div className="name">{post.context}</div>
                                    <div className="time">{formatDate(post.registrationDate)}</div>
                                </div>
                            </div>
                            <div className="content">
                                <p>{post.content}</p>
                            </div>
                            <div className="actions">
                                <p>{post.likesCount}</p>
                                <button onClick={() => handleLike(post.postId)}>
                                    <img src="../../public/img/Like.png" alt="HomePage Logo" className='homePage-logo' />
                                    <span>Curtir</span>
                                </button>
                                <button onClick={openPopup}>
                                    <img src="../../public/img/Comment.png" alt="HomePage Logo" className='homePage-logo' />
                                    <span>Comentar</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <CommentPopup
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    onSubmit={handleCommentSubmit}
                />
            </div>
        </div>
    );
}

export default FeedIndex;
