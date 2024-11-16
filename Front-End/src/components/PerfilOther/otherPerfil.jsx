
import React, { useState, useEffect } from "react";
import "./otherPerfil.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../loading/loading";
import AuthService from "../services/AuthServices";
import CommentPopup from "../ComentarioPop-Up/comentarioPopUp";
import Edit_perfilPopUp from "../Edit_Perfil_Pop-Up/edit_perfilPop-Up";

function PerfilOtherForm({ authService }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [followersCount, setFollowersCount] = useState(0); // Novo estado para seguidores
  const [followingCount, setFollowingCount] = useState(0); // Novo estado para seguidos
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const perfilUserId = localStorage.getItem("otherUserId");

  useEffect(() => {
    fetchUser();
    fetchPostsOther();
    fetchFollowersCount();
    fetchFollowingCount();
  }, [perfilUserId]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${perfilUserId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      setUser(response.data);
      console.log("Texto: " + user);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchFollowersCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/followers/${perfilUserId}/followers`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFollowersCount(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar seguidores:", error);
    }
  };

  const fetchFollowingCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/followers/${perfilUserId}/following`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFollowingCount(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar usuários seguidos:", error);
    }
  };

  const fetchPostsOther = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/posts/user/${perfilUserId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setPosts(response.data);  // Armazena os posts retornados
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os posts do usuário:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const newLike = {
        perfilUserId: perfilUserId,
        postId: postId,
      };
      const response = await axios.post(
        `http://localhost:3000/likes`,
        newLike,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log("Like adicionado:", response.data);
      setUpdateFlag(!updateFlag); // Atualizar a flag aqui
    } catch (error) {
      console.error("Erro ao adicionar like:", error);
    }
  };

  const openEditPopup = () => {
    setIsPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsPopupOpen(false);
  };

  const openCommentPopup = (post) => {
    setSelectedPost(post);
    setIsPopupOpen(true);
  };

  const closeCommentPopup = () => {
    setSelectedPost(null);
    setIsPopupOpen(false);
  };

  const handleCommentSubmit = (comment) => {
    console.log("Comentário enviado:", comment);
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
          src="../../public/img/logo.png"
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
          <a
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
          </a>
        </ul>
      </div>
      <div className="main-perfil">
        <div className="perfil-header">
          <img
            src="https://via.placeholder.com/40"
            className="foto-perfil"
            alt={user.name || "Usuário Desconhecido"}
          />
          <div className="perfil-info">
            <h1>{user.name}</h1>
            <p>Seguidores: {followersCount}</p>
            <p>Seguindo: {followingCount}</p>
          </div>
          <div className="edit-perfil">
            <button onClick={() => openEditPopup()}>
              <img
                src="../../public/img/Edit.png"
                alt="Edit Perfil"
                className="edit-perfil-img"
              ></img>
              <p>Editar Perfil</p>
            </button>
          </div>
        </div>

        <div className="posts-perfil">
          {posts.map((post) => (
            <div className="post-perfil" key={post.id}>
              <div className="container-user-perfil">
                <div className="image-user-perfil">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={user.name || "Usuário Desconhecido 1"}
                  />
                </div>
                <div className="container-info-user-perfil">
                  <div className="name-user-perfil">
                    <p>{user ? "@" + user.user : "Usuário Desconhecido 2"}</p>
                    <p>{formatDate(post.registrationDate)}</p>
                  </div>
                  <div className="curso-user-perfil">
                    <p>{user.curso || "Curso Desconhecido 1"}</p>
                  </div>
                  <div className="time-post-perfil"></div>
                </div>
              </div>
              <div className="content-perfil">
                <p>{post.context}</p>
              </div>
              <div className="actions-perfil">
                <div className="curtir-perfil">
                  <p>{post.likesCount}</p>
                  <button onClick={() => handleLike(post.postId)}>
                    <img
                      src="../../public/img/Like.png"
                      alt="HomePage Logo"
                      className="homePage-logo-perfil"
                    />
                    <span>Curtir</span>
                  </button>
                </div>
                <div className="comentar-perfil">
                  <button onClick={() => openCommentPopup(post)}>
                    <img
                      src="../../public/img/Comment.png"
                      alt="HomePage Logo"
                      className="homePage-logo-perfil"
                    />
                    <span>Comentar</span>
                  </button>
                </div>
                <div className="salvar-perfil">
                  <button>
                    <img src="../../public/img/Save.png" />
                    <span>Salvar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CommentPopup
          isOpen={isPopupOpen}
          onClose={closeCommentPopup}
          onSubmit={handleCommentSubmit}
          post={selectedPost}
        />
      </div>
    </div>
  );
}

PerfilOtherForm.propTypes = {
  authService: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    recoverPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default PerfilOtherForm;

