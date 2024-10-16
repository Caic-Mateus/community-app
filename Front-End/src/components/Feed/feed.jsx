import React, { useState, useEffect } from "react";
import "./feed.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../loading/loading";
import CommentPopup from "../ComentarioPop-Up/comentarioPopUp";
import AuthService from "../services/AuthServices";

function FeedIndex({ authService }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

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
      const response = await axios.get("http://localhost:3000/posts/allposts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
      console.error("Erro ao buscar os posts:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      setIsLoggingOut(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const newLike = {
        userId: uid,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const newPostData = {
        context: newPostContent,
        likesCount: 0,
        commentsCount: 0,
        userId: uid,
      };
      const response = await axios.post(
        "http://localhost:3000/posts",
        newPostData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log("Novo post criado:", response.data);
      setNewPostContent("");
      setLoading(false);
      setUpdateFlag(!updateFlag); // Atualizar a flag aqui
    } catch (error) {
      console.error("Erro ao criar o novo post:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const openPopup = (post) => {
    setSelectedPost(post);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedPost(null);
    setIsPopupOpen(false);
  };

  const handleCommentSubmit = (comment) => {
    console.log("Comentário enviado:", comment);
    // Você pode adicionar a lógica para enviar o comentário aqui
  };

  function formatDate(timestamp) {
    const date = timestamp ? new Date(timestamp._seconds * 1000) : null; // Verifica se timestamp está definido
    return date ? date.toLocaleDateString() : "Data Desconhecida"; // Verifica se date está definido
  }

  return (
    <div className="container-feed">
      <div className="sidebar-feed">
        <img
          src="../../public/img/Ft_cu.png"
          alt="Google Logo"
          className="commu-logo-feed"
        />
        <ul>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/HomePage.png"
              alt="HomePage Logo"
              className="homePage-logo-feed"
            />
            <span>Página inicial</span>
          </a>
          <a href="http://localhost:5173/notificacao">
            <img
              src="../../public/img/Notify.png"
              alt="HomePage Logo"
              className="homePage-logo-feed"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/mensagens">
            <img
              src="../../public/img/Message.png"
              alt="HomePage Logo"
              className="homePage-logo-feed"
            />
            <span>Mensagens</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Save.png"
              alt="HomePage Logo"
              className="homePage-logo-feed"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/perfil">
            <img
              src="../../public/img/Profile.png"
              alt="HomePage Logo"
              className="homePage-logo-feed"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/More.png"
              alt="HomePage Logo"
              className="homePage-logo-feed"
            />
            <span>Mais</span>
          </a>
          <button onClick={logout}>
            <img
              src="../../public/img/Logout.png"
              className="homePage-logo-feed"
            ></img>
            Sair
          </button>
        </ul>
      </div>
      <div className="main-feed">
        <div className="header-feed">
          <div className="search-bar-feed">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="O que está acontecendo?"
                value={newPostContent}
                onChange={(event) => setNewPostContent(event.target.value)}
              />
              <button
                type="submit"
                className="button-post-feed"
                disabled={loading}
              >
                {loading ? <Loading /> : "Postar"}
              </button>
            </form>
          </div>
        </div>
        <div className="posts-feed">
          {posts.map((post) => (
            <div className="post-feed" key={post.uid}>
              <div className="user-feed">
                <img
                  src="https://via.placeholder.com/40"
                  alt={post.user ? post.user.name : "Usuário Desconhecido"}
                />
                <div className="info-feed">
                  <div className="infoUser-feed">
                    <div className="name-feed">
                      {post.user
                        ? "@" + post.user.user
                        : "Usuário Desconhecido"}
                    </div>
                    <div className="name-feed">
                      {post.user?.curso
                        ? post.user.curso
                        : "Curso Desconhecido"}
                    </div>
                    <div className="time-feed">
                      {formatDate(post.registrationDate)}
                    </div>
                  </div>
                  <div className="content-feed">
                    <p>{post.context}</p>
                  </div>
                </div>
              </div>
              <div className="actions-feed">
                <p>{post.likesCount}</p>
                <button onClick={() => handleLike(post.postId)}>
                  <img
                    src="../../public/img/Like.png"
                    alt="HomePage Logo"
                    className="homePage-logo-feed"
                  />
                  <span>Curtir</span>
                </button>
                <button onClick={() => openPopup(post)}>
                  <img
                    src="../../public/img/Comment.png"
                    alt="HomePage Logo"
                    className="homePage-logo-feed"
                  />
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
          post={selectedPost}
        />
      </div>
    </div>
  );
}

export default FeedIndex;
