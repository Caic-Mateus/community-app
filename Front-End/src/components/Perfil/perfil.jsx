import React, { useState, useEffect } from "react";
import "./perfil.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../loading/loading";
import AuthService from "../services/AuthServices";

function Profile({ authService }) {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [userId]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/users/${uid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/posts/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: {
          userid: uid,
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os posts do usuário:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  function formatDate(timestamp) {
    const date = timestamp ? new Date(timestamp._seconds * 1000) : null;
    return date ? date.toLocaleDateString() : "Data Desconhecida";
  }

  if (loading) return <Loading />;

  return (
    <div className="container-perfil">
      <div className="sidebar-perfil">
        <img
          src="../../public/img/Ft_cu.png"
          alt="Logo"
          className="commu-logo-perfil"
        />
        <ul>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/HomePage.png"
              alt="HomePage Logo"
              className="homePage-logo-perfil"
            />
            <span>Página inicial</span>
          </a>
          <a href="http://localhost:5173/notificacao">
            <img
              src="../../public/img/Notify.png"
              alt="Notificações"
              className="homePage-logo-perfil"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/mensagens">
            <img
              src="../../public/img/Message.png"
              alt="Mensagens"
              className="homePage-logo-perfil"
            />
            <span>Mensagens</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Save.png"
              alt="Itens Salvos"
              className="homePage-logo-perfil"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Profile.png"
              alt="Perfil"
              className="homePage-logo-perfil"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/More.png"
              alt="Mais"
              className="homePage-logo-perfil"
            />
            <span>Mais</span>
          </a>
          <button
            className="botao-logout-perfil"
            onClick={() => {
              authService.logout();
              navigate("/");
            }}
          >
            <img
              src="../../public/img/Logout.png"
              alt="Logout"
              className="homePage-logo-perfil"
            />
            Sair
          </button>
        </ul>
      </div>
      <div className="main-perfil">
        <div className="perfil-header">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        <div className="posts-perfil">
          {posts.map((post) => (
            <div className="post-perfil" key={post.postId}>
              <div className="user-perfil">
                <img
                  className="perfil-image"
                  src="https://via.placeholder.com/40"
                  alt={user.name || "Usuário Desconhecido"}
                />
                <div className="info-perfil">
                  <div className="name-perfil">
                    {user ? "@" + user.user : "Usuário Desconhecido"}
                  </div>
                  <div className="name-perfil">
                    {user.curso || "Curso Desconhecido"}
                  </div>
                  <div className="time-perfil">
                    {formatDate(post.registrationDate)}
                  </div>
                </div>
              </div>
              <div className="content-perfil">
                <p>{post.context}</p>
              </div>
              <div className="actions-perfil">
                <p>{post.likesCount}</p>
                <button onClick={() => handleLike(post.postId)}>
                  <img
                    src="../../public/img/Like.png"
                    alt="Curtir"
                    className="homePage-logo"
                  />
                  <span>Curtir</span>
                </button>
                <a href="#">
                  <img
                    src="../../public/img/Comment.png"
                    alt="Comentar"
                    className="homePage-logo"
                  />
                  <span>Comentar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  authService: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    recoverPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
