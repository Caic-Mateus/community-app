import React, { useState, useEffect } from "react";
import "./perfil.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../loading/loading";
import CommentPopup from "../ComentarioPop-Up/comentarioPopUp";
import Edit_perfilPopUp from "../Edit_Perfil_Pop-Up/edit_perfilPop-Up";

function Profile({ authService }) {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
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
    } catch (error) {
      console.error("Erro ao adicionar like:", error);
    }
  };

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const openCommentPopup = (post) => {
    setSelectedPost(post);
    setIsCommentPopupOpen(true);
  };

  const closeCommentPopup = () => {
    setSelectedPost(null);
    setIsCommentPopupOpen(false);
  };

  // No Profile.js
const handleSaveProfile = async (updatedUserData) => {
  try {
    // Enviar dados atualizados para o backend
    const response = await axios.put(
      `http://localhost:3000/users/${uid}`,
      updatedUserData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    console.log("Usuário atualizado com sucesso:", response.data);
    // Atualizar o estado do usuário
    setUser(response.data);
    fetchUser(); // Recarregar as informações atualizadas
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
  }
};


  const handleEditSave = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${uid}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log("Usuário atualizado:", response.data);
      setUser(response.data); // Atualizar o estado com os novos dados
      closeEditPopup();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
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
            src={user.avatarUrl != null ? user.avatarUrl : "https://via.placeholder.com/40" }
            className="foto-perfil"
            alt={user.name || "Usuário Desconhecido"}
          />
          <div className="perfil-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
          <div className="edit-perfil">
            <button onClick={openEditPopup}>
              <img
                src="../../public/img/Edit.png"
                alt="Edit Perfil"
                className="edit-perfil-img"
              />
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
                    src={user.avatarUrl != null ? user.avatarUrl : "https://via.placeholder.com/40" }
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
          isOpen={isCommentPopupOpen}
          onClose={closeCommentPopup}
          onSubmit={(comment) => console.log("Comentário:", comment)}
          post={selectedPost}
        />
        <Edit_perfilPopUp
          isOpen={isEditPopupOpen}
          onClose={closeEditPopup}
          userData={user}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  );
}

Profile.propTypes = {
  authService: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
