import React, { useState } from 'react';
import './feed.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../loading/loading';
import AuthService from '../services/AuthServices';


function FeedIndex({ authService }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    
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
        <div className='feedContainer'>
            <div className='feedStart'>
                <ul>
                    <li><a href='#'>Página Inicial</a></li>
                    <li></li>
                </ul>
            </div>
            <div className='feedTop'>
                <p>O que está pensando?</p>
                <button className='clear' onClick={logout}>
                    Sair
                </button>
            </div>
            {isLoggingOut && <Loading />}
        </div>
    );
}

FeedIndex.propTypes = {
      authService: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      recoverPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default FeedIndex;
