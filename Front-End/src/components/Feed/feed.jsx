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
        <div className='container'>
            <div className='lineUnique'>
                <p>O que está pensando?</p>
                <input type='text' placeholder='O que está pensando?'></input>
                <button onClick={logout}>Sair</button>
            </div>
            <div className='content'>
            <div className='options'>
                <list>
                    <a href='http://localhost:5173/feed'>Página inicial</a>
                    <a href='http://localhost:5173/feed' >Notificações</a>
                    <a href='http://localhost:5173/feed'>Mensagens</a>
                    <a href='http://localhost:5173/feed'>Itens Salvos</a>
                    <a href='http://localhost:5173/feed'>Configurações</a>
                    <a href='http://localhost:5173/feed'>Perfil</a>
                    
                </list>
            </div>
            <div className='feed'>
                <p>Postagens Aqui</p>
            </div>
            </div>
        </div>
    );
}

export default FeedIndex;
