import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import "./mensagem.css";
import io from "socket.io-client";
import Loading from "../loading/loading";
import AuthService from "../services/AuthServices";

const token = localStorage.getItem("token");

const ChatModal = React.memo(({ isOpen, onClose, messageList, message, setMessage, sendMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <div className="chat-messages">
          {messageList.length > 0 ? (
            messageList.map((msg, index) => (
              <div
                key={index}
                className={msg.userId === localStorage.getItem("uid") ? "my-message" : "received-message"}
                style={{
                  backgroundColor: msg.userId === localStorage.getItem("uid") ? "lightgreen" : "white",
                }}
              >
                {msg.userId !== localStorage.getItem("uid") ? <strong>{msg.userName || "Desconhecido"}: </strong> : null}
                {msg.message}
              </div>
            ))
          ) : (
            <p>Nenhuma mensagem antiga.</p>
          )}
        </div>
        <div className="sendMessage">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
});

const MensagemForm = ({ authService }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);

  const messagesEndRef = useRef(null);

  const fetchUsers = async (term) => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/users/search?name=${term}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Não foi possível carregar os usuários.");
    } finally {
      setIsSearching(false);
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

  const fetchChats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/chat/${localStorage.getItem("uid")}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setChats(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Não foi possível carregar os chats.");
      setLoading(false);
    }
  };

  const openChatModal = async (chat) => {
    setSelectedChat(chat);
    setSelectedRecipientId(null);
    setIsChatModalOpen(true);
    setMessage("");
    await loadMessages(chat.id);
  };

  const startConversation = (recipientId) => {
    setSelectedRecipientId(recipientId);
    setIsChatModalOpen(true);
    setMessageList([]);
  };

  const loadMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/message/messages/${chatId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessageList(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  const fetchChatId = async (recipientId) => {
    try {
      const uid = localStorage.getItem("uid");
      const response = await axios.get(
        `http://localhost:3000/chat/findChatId?userId=${uid}&recipientId=${selectedRecipientId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessageList([]);
      return response.data.chatId;
    } catch (error) {
      console.error("Erro ao buscar chatId:", error);
      setError("Não foi possível iniciar o chat.");
    }
  };

  const sendMessage = useCallback(async () => {
    const uid = localStorage.getItem("uid");

    if (selectedRecipientId && selectedChat == null) {
      try {
        socket.emit("chatMessage", message, uid, null, selectedRecipientId);
        const chatId = await fetchChatId(selectedRecipientId);
        selectedChat.chatId = chatId;
        setSelectedRecipientId(null);
      } catch (error) {
        console.error("Erro ao iniciar conversa:", error);
        return;
      }
    } else {
      socket.emit(
        "chatMessage",
        message,
        uid,
        selectedChat.id,
        selectedChat.recipientId === uid ? selectedChat.userId : selectedChat.recipientId
      );
    }
    setMessage("");
  }, [message, selectedRecipientId, selectedChat, socket]);

  useEffect(() => {
    const socketInstance = io.connect("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("receiveMessage", (data) => {
      if (selectedChat) {
        loadMessages(selectedChat.id);
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [selectedChat]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  useEffect(() => {
    if (messageList.length > 0) {
      scrollToBottom();
    }
  }, [messageList]);

  if (loading) return <Loading />;

  return (
    <div className="container-mensagem">
      <div className="sidebar-mensagem">
        <img
          src="../../public/img/logo.png"
          alt="Google Logo"
          className="commu-logo-mensagem"
        />
        <ul>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/HomePage.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Página inicial</span>
          </a>
          <a href="http://localhost:5173/notificacao">
            <img
              src="../../public/img/Notify.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Notificações</span>
          </a>
          <a href="http://localhost:5173/mensagens">
            <img
              src="../../public/img/Message.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Mensagens</span>
          </a>
          <a href="http://localhost:5173/itensSalvos">
            <img
              src="../../public/img/Save.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/perfil/:userId">
            <img
              src="../../public/img/Profile.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/maisOpcoes">
            <img
              src="../../public/img/More.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Mais</span>
          </a>
          <a onClick={logout}>
            <img
              src="../../public/img/Logout.png"
              className="homePage-logo-mensagem"
            ></img>
            Sair
          </a>
        </ul>
      </div>
      <main className="content-mensagem">
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
                    onClick={() => startConversation(user.uid)}
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
              <li
                key={chat.id}
                className="item-mensagem"
                onClick={() => openChatModal(chat)}
              >
                <span className="nome-mensagem">
                  {chat.userId === localStorage.getItem("uid")
                    ? chat.nameRecipient
                    : chat.userName}
                </span>
                <p className="texto-mensagem">{chat.lastMessage}</p>
              </li>
            ))
          )}
        </ul>
      </main>
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        messageList={messageList}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default MensagemForm;
