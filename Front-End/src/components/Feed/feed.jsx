import React, { useState } from 'react';
import './feed.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../loading/loading';
import AuthService from '../services/AuthServices';

function FeedIndex({ authService }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    FeedIndex.propTypes = {
        authService: PropTypes.shape({
            login: PropTypes.func.isRequired,
            logout: PropTypes.func.isRequired,
            recoverPassword: PropTypes.func.isRequired,
        }).isRequired,
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

    return (
        <div className="container">
        <div className="sidebar">
        <img src="../../public/img/Ft_cu.png" alt="Google Logo" className="commu-logo" />
            <ul>       
                <a href="http://localhost:5173/feed">
                    <img src="../../public/img/HomePage.png" alt="HomePage Logo" className='homePage-logo'  />
                    <span>Página inicial</span>
                </a>
                <a href="http://localhost:5173/feed">
                    <img src="../../public/img/Notify.png" alt="HomePage Logo" className='homePage-logo'  />
                    <span>Notificações</span>
                </a>
                <a href="http://localhost:5173/feed">
                    <img src="../../public/img/Message.png" alt="HomePage Logo" className='homePage-logo'  />
                    <span>Mensagens</span>
                </a>
                <a href="http://localhost:5173/feed">
                    <img src="../../public/img/Save.png" alt="HomePage Logo" className='homePage-logo'  />
                    <span>Itens Salvos</span>
                </a>
                <a href="http://localhost:5173/feed">
                    <img src="../../public/img/Profile.png" alt="HomePage Logo" className='homePage-logo'  />
                    <span>Perfil</span>
                </a>
                <a href="http://localhost:5173/feed">
                    <img src="../../public/img/More.png" alt="HomePage Logo" className='homePage-logo'  />
                    <span>Mais</span>
                </a>
                <button classname='botao-logout' onClick={logout}>
                    <img src='../../public/img/Logout.png' className='homePage-logo'></img>
                    Sair
                </button>
            </ul>
        </div>
        <div className="main">
            <div className="header">
                    <div className="search-bar">
                        <input type="text" placeholder="O que está acontecendo?" className="input-personalizado" />
                        <button className="botao-sem-fundo">Postar</button>
                        <i className="fas fa-search"></i>
                    </div>
            </div>
            <div className="posts">
                <div className="post">
                    <div className="user">
                        <img src="https://via.placeholder.com/40" alt="Melissa Nascimento" />
                        <div className="info">
                            <div className="name">Melissa Nascimento</div>
                            <div className="time">1h</div>
                        </div>
                    </div>
                    <div className="content">
                        <p>Até que enfim consegui entender. Quem precisar de ajuda é só me chamar kkkkkk.</p>
                    </div>
                    <div className="matrix">
                    </div>
                    <div className="actions">
                        <a href="#">
                            <img src="../../public/img/Like.png" alt="HomePage Logo" className='homePage-logo'  />
                            <span>Curtir</span>
                            <span>Contador</span>
                        </a>
                        <a href="#">
                            <img src="../../public/img/Comment.png" alt="HomePage Logo" className='homePage-logo'  />
                            <span>Comentar</span>
                        </a>
                    </div>
                </div>
                <div className="post">
                    <div className="user">
                        <img src="https://via.placeholder.com/40" alt="Guilherme Nunes" />
                        <div className="info">
                            <div className="name">Guilherme Nunes</div>
                            <div className="time">2h</div>
                        </div>
                    </div>
                    <div className="content">
                        <p>Gente fiz um resumo sobre "Cibersegurança", espero que ajude: consiste em evitar que os dados digitais sejam comprometidos ou atacados. Embora haja sobreposição entre as duas, elas são diferentes; muitas vezes, a cibersegurança é vista como um subconjunto da segurança da informação.</p>
                    </div>
                    <div className="actions">
                    <a href="#">
                            <img src="../../public/img/Like.png" alt="HomePage Logo" className='homePage-logo'  />
                            <span>Curtir</span>
                            <span>Contador</span>
                        </a>
                        <a href="#">
                            <img src="../../public/img/Comment.png" alt="HomePage Logo" className='homePage-logo'  />
                            <span>Comentar</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default FeedIndex;
