import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/loading/loading";
import CommentPopup from "../components/ComentarioPop-Up/comentarioPopUp";
import AuthService from "../components/services/AuthServices";
import "./itensSalvos.css";

function ItensSalvosForm({ authService }) {
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

  ItensSalvosForm.propTypes = {
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
    <div className="container-salvos">
      <div className="sidebar-salvos">
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
              className="homePage-logo-salvos"
            />
            <span>Página inicial</span>
          </a>
          <a href="http://localhost:5173/notificacao">
            <img
              src="../../public/img/Notify.png"
              alt="HomePage Logo"
              className="homePage-logo-salvos"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/mensagens">
            <img
              src="../../public/img/Message.png"
              alt="HomePage Logo"
              className="homePage-logo-salvos"
            />
            <span>Mensagens</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Save.png"
              alt="HomePage Logo"
              className="homePage-logo-salvos"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/perfil">
            <img
              src="../../public/img/Profile.png"
              alt="HomePage Logo"
              className="homePage-logo-salvos"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/More.png"
              alt="HomePage Logo"
              className="homePage-logo-salvos"
            />
            <span>Mais</span>
          </a>
          <button onClick={logout}>
            <img
              src="../../public/img/Logout.png"
              className="homePage-logo-salvos"
            ></img>
            Sair
          </button>
        </ul>
      </div>

      <main className="main-salvos">
        <header className="header-salvos">
          <h2>Seus itens salvos:</h2>
        </header>

        <div className="posts-salvos">
          {posts.map((post) => (
            <div className="post-feed" key={post.uid}>
              <div className="container-user-salvos">
                <div className="image-user-salvos">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={post.user ? post.user.name : "Usuário Desconhecido"}
                  />
                </div>
                <div className="container-info-user-salvos">
                  <div className="name-user-salvos">
                    <p>
                      {post.user
                        ? "@" + post.user.user
                        : "Usuário Desconhecido"}
                    </p>
                  </div>
                  <div className="curso-user-salvos">
                    <p>
                      {post.user?.curso
                        ? post.user.curso
                        : "Curso Desconhecido"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-post-salvos">
                {formatDate(post.registrationDate)}
              </div>
              <div className="content-salvos">
                <p>{post.context}</p>
              </div>

              <div className="actions-salvos">
                <div className="curtir-salvos">
                  <p>{post.likesCount}</p>
                  <button onClick={() => handleLike(post.postId)}>
                    <img
                      src="../../public/img/Like.png"
                      alt="HomePage Logo"
                      className="homePage-logo-salvos"
                    />
                    <span>Curtir</span>
                  </button>
                </div>
                <div className="comentar-salvos">
                  <button onClick={() => openPopup(post)}>
                    <img
                      src="../../public/img/Comment.png"
                      alt="HomePage Logo"
                      className="homePage-logo-salvos"
                    />
                    <span>Comentar</span>
                  </button>
                </div>
                <div className="salvar-salvos">
                  <button>
                    <img></img>
                    <span>Salvar</span>
                  </button>
                </div>
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
      </main>
      <div className="loading-salvos">{loading ? <Loading /> : ""}</div>
    </div>
  );
}

export default ItensSalvosForm;
