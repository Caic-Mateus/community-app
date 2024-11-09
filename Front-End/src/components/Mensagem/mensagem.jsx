import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mensagem.css";
import io from 'socket.io-client';

const token = localStorage.getItem("token");

const MensagemForm = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Para armazenar o usuário selecionado para nova conversa

  // Função para buscar usuários
  const fetchUsers = async (term) => {
    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:3000/users/search?name=${term}`, {
        headers: {
          Authorization: token,
        },
      });
      setSearchResults(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Não foi possível carregar os usuários.");
    } finally {
      setIsSearching(false);
    }
  };

  // Função para buscar chats
  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/chat/${localStorage.getItem("uid")}`, {
        headers: {
          Authorization: token,
        },
      });
      setChats(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Não foi possível carregar os chats.");
      setLoading(false);
    }
  };

  // Função para abrir o modal e buscar mensagens
  const openChatModal = async (chat) => {
    setSelectedChat(chat);
    setIsChatModalOpen(true);
    setMessage("");

    // Buscar mensagens antigas
    await loadMessages(chat.id);
  };

  // Função para iniciar uma conversa ao clicar em um usuário
  const startConversation = async (userId) => {
    setSelectedUser(userId); // Define o usuário selecionado
    setIsChatModalOpen(true); // Abre o modal do chat
    setMessage(""); // Limpa a mensagem

    // Aqui, criamos ou buscamos um chat com o usuário
    // try {
    //   const response = await axios.post('http://localhost:3000/chat/start', {
    //     userId: userId, // ID do usuário selecionado
    //   }, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   });

    //   setSelectedChat(response.data); // Armazena o chat retornado
    //   await loadMessages(response.data.id); // Carrega mensagens do novo chat
    // } catch (error) {
    //   console.error("Erro ao iniciar conversa:", error);
    // }
  };

  // Função para buscar mensagens por chatId
  const loadMessages = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:3000/message/messages/${chatId}`, {
        headers: {
          Authorization: token,
        },
      });
      setMessageList(response.data);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  // Conectar ao WebSocket
  useEffect(() => {
    const socketInstance = io.connect('http://localhost:3000');
    setSocket(socketInstance);

    // Ouvir mensagens recebidas
    socketInstance.on('receiveMessage', (data) => {
      console.log('Mensagem recebida no front-end:', data);
      // Ao receber uma nova mensagem, recarregue as mensagens do chat atual
      if (selectedChat) {
        loadMessages(selectedChat.id);
      }
    });

    return () => {
      socketInstance.disconnect(); // Desconectar o socket ao desmontar o componente
    };
  }, [selectedChat]);

  // Atualiza a busca conforme o usuário digita, com debounce de 500ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchUsers(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchChats();
  }, []);

  // Função para enviar mensagem
  const sendMessage = async () => {
    const uid = localStorage.getItem("uid");
    socket.emit('chatMessage', message, uid, selectedChat.id, selectedChat.recipientId === uid ? selectedChat.userId : selectedChat.recipientId);
    setMessage(""); // Limpa o campo de mensagem

    // Recarregar mensagens após enviar
    await loadMessages(selectedChat.id);
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

  // Componente Modal para chats
  const ChatModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <div className="chat-messages">
            {messageList.length > 0 ? (
              messageList.map((msg, index) => (
                <div
                  key={index}
                  className={msg.userId === localStorage.getItem("uid") ? "my-message" : "received-message"}
                >
                  {msg.userId === localStorage.getItem("uid") ? msg.message : msg.recipientName + " :" + msg.message}
                </div>
              ))
            ) : (
              <p>Nenhuma mensagem antiga.</p>
            )}
          </div>
          <div className="sendMessage">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container-mensagem">
      <div className="sidebar-mensagem">
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
          <a href="http://localhost:5173/itensSalvos">
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
          <a href="http://localhost:5173/maisOpcoes">
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

      <main className="content-amensagem">
        <div className="search-mensagem">
          <input
            type="text"
            placeholder="Buscar usuários"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ul className="search-results">
              {isSearching ? (
                <li>Carregando...</li>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <li
                    key={user.uid}
                    className="user-item"
                    onClick={() => startConversation(user.uid)} // Inicia a conversa ao clicar
                  >
                    {user.name}
                  </li>
                ))
              ) : (
                <li>Nenhum usuário encontrado</li>
              )}
            </ul>
          )}
        </div>

        <ul className="lista-mensagem">
          {chats.length === 0 ? (
            <li className="item-mensagem">Nenhum chat encontrado</li>
          ) : (
            chats.map((chat) => (
              <li key={chat.id} className="item-mensagem" onClick={() => openChatModal(chat)}>
                <span className="nome-mensagem">{chat.nameRecipient}</span>
                <p className="texto-mensagem">{chat.lastMessage}</p>
              </li>
            ))
          )}
        </ul>
      </main>

      <ChatModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)} 
      />
    </div>
  );
};

export default MensagemForm;
