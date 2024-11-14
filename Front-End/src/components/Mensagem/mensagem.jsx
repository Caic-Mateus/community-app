import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./mensagem.css";
import io from "socket.io-client";
import Loading from "../loading/loading";
import AuthService from "../services/AuthServices";

const token = localStorage.getItem("token");

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
  const [selectedRecipientId, setSelectedRecipientId] = useState(null); // Novo estado para o recipientId
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
    setSelectedRecipientId(null); // Limpa o recipientId quando abre um chat existente
    setIsChatModalOpen(true);
    setMessage("");
    await loadMessages(chat.id);
  };

  // Função para iniciar uma conversa ao clicar em um usuário
  const startConversation = (recipientId) => {
    setSelectedRecipientId(recipientId); // Salva o recipientId
    setIsChatModalOpen(true); // Abre o modal
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
      setMessageList(response.data || []); // Garante que seja um array
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

      return response.data.chatId; // Supondo que o endpoint retorne o chatId direto
    } catch (error) {
      console.error("Erro ao buscar chatId:", error);
      setError("Não foi possível iniciar o chat.");
    }
  };

  const sendMessage = async () => {
    const uid = localStorage.getItem("uid");

    if (selectedRecipientId && selectedChat == null) {
      // Se há um recipientId selecionado (novo chat)
      try {
        socket.emit("chatMessage", message, uid, null, selectedRecipientId);

        //FAZER LOADING PARA BUSCAR CHAT
        const chatId = await fetchChatId(selectedRecipientId);
        selectedChat.chatId = chatId;
        setSelectedRecipientId(null); // Limpa o recipientId
      } catch (error) {
        console.error("Erro ao iniciar conversa:", error);
        return;
      }
    } else {
      //Envia a mensagem pelo WebSocket
      socket.emit(
        "chatMessage",
        message,
        uid,
        selectedChat.id,
        selectedChat.recipientId === uid
          ? selectedChat.userId
          : selectedChat.recipientId
      );
    }
    setMessage("");
  };

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

  //Logica para Deixar o scroll do modal sempre no fim da pagina
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  useEffect(() => {
    // Sempre que a lista de mensagens for atualizada, rolar para o final
    if (messageList.length > 0) {
      scrollToBottom();
    }
  }, [messageList]);

  const ChatModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    if (loading) return <Loading />;

    return (
      <div className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              onClose();
              setMessageList([]); // Limpa a lista de mensagens ao fechar o modal
            }}
          >
            &times;
          </span>
          <div className="chat-messages">
            {messageList.length > 0 ? (
              messageList.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.userId === localStorage.getItem("uid")
                      ? "my-message"
                      : "received-message"
                  }
                >
                  {msg.userId !== localStorage.getItem("uid") ? (
                    <strong>{msg.userName || "Desconhecido"}: </strong>
                  ) : null}
                  {msg.message}
                </div>
              ))
            ) : (
              <p>Nenhuma mensagem antiga.</p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="sendMessage">
            <textarea
              placeholder="Digite sua mensagem aqui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      </div>
    );
  };

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
                  {chat.userId == localStorage.getItem("uid")
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
      />
    </div>
  );
};

export default MensagemForm;
