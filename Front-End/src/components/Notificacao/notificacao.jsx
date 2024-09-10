import React from 'react';
import './notificacao.css';

const Notificacao = () => {
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
                    <button className='botao-logout' >
                        <img src='../../public/img/Logout.png' className='homePage-logo'></img>
                        Sair
                    </button>
                </ul>
            </div>
            <div className="contentNotify">
                <div className="headerNotify">
                    <h1>Notificações</h1>
                </div>
                <div className="notifications">
                    <div className="notification">
                        <h2>Não Visto</h2>
                        <p><strong>Calebe Silva Costa</strong> . 30 min</p>
                        <p>Análise e Desenvolvimento de Sistemas</p>
                        <p>Meu MySQL não está funcionando, alguém pode me ajudar?? ERROR: Too Many Connections</p>
                    </div>
                    <div className="notification">
                        <p><strong>Melissa Nascimento</strong> . 1 h</p>
                        <p>Análise e Desenvolvimento de Sistemas</p>
                        <p>Até que enfim consegui entender 🙏 Quem precisar de ajuda é só me chamar kkkkkk.</p>
                    </div>
                    <div className="notification">
                        <h2>Vistos</h2>
                        <p><strong>Diretoria | Fatec SCS</strong> . 2 h</p>
                        <p>Antonio Russo</p>
                        <p>Oportunidade de Estágio </p>
                    </div>
                    <div className="notification">
                        <p><strong>Diretoria | Fatec SCS</strong> . 2 h</p>
                        <p>Antonio Russo</p>
                        <p>Oportunidade de Trainee </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notificacao;
