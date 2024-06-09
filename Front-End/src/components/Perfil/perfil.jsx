import React, { useState, useEffect } from 'react';
import './perfil.css';
import AuthService from '../services/AuthServices';


function PerfilForm({ authService }) {

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
                    <a href="http://localhost:5173/feed">
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
                <div className="profile">
                    <div className="profile-image">
                        <img src="https://via.placeholder.com/150" alt="Lucas Borel" />
                    </div>
                    <div className="profile-info">
                        <h2>Lucas Borel</h2>
                        <p>lucas@fatec.com</p>
                        <div className="profile-stats">
                            <p>4 amigos</p>
                            <p>47 seguindo</p>
                        </div>
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
  export default PerfilForm;