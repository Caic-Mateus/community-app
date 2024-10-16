import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mensagem.css";

const token = localStorage.getItem("token");

const MensagemForm = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [searchResults, setSearchResults] = useState([]); // Estado para os resultados da busca
  const [isSearching, setIsSearching] = useState(false); // Estado de carregamento da busca
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal para usuários
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // Estado do modal para chats
  const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado
  const [selectedChat, setSelectedChat] = useState(null); // Chat selecionado
  const [message, setMessage] = useState(""); // Mensagem a ser enviada

  // Função para buscar usuários com base no termo de busca
  const fetchUsers = async (term) => {
    setIsSearching(true); // Indica que a busca começou
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
      setIsSearching(false); // Termina o carregamento da busca
    }
  };

  // Função para buscar os chats do usuário logado
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

  // Função para iniciar uma conversa ao clicar em um usuário
  const startConversation = (userId) => {
    setSelectedUser(userId);
    setIsModalOpen(true); // Abre o modal ao clicar no nome do usuário
  };

  // Função para abrir o modal ao clicar em um chat existente
  const openChatModal = (chat) => {
    setSelectedChat(chat); // Define o chat selecionado
    setIsChatModalOpen(true); // Abre o modal do chat
    setMessage(""); // Limpa a mensagem
  };

  // Atualiza a busca conforme o usuário digita, com debounce de 500ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchUsers(searchTerm);
      } else {
        setSearchResults([]); // Limpa os resultados quando não há termo de busca
      }
    }, 500); // Debounce de 500ms

    return () => clearTimeout(delayDebounceFn); // Limpa o timeout se o termo mudar rapidamente
  }, [searchTerm]);

  useEffect(() => {
    fetchChats();
  }, []);

  // Função para enviar mensagem
  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3000/chat/send', {
        recipientId: selectedUser || selectedChat.recipientId, // Usa o recipientId do chat se estiver aberto
        message: message,
      }, {
        headers: {
          Authorization: token,
        },
      });
      alert('Mensagem enviada com sucesso!');
      setIsChatModalOpen(false); // Fecha o modal após o envio
      setIsModalOpen(false); // Fecha o modal do usuário se estava aberto
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Erro ao enviar mensagem.");
    }
  };

  // Componente Modal para usuários
  const UserModal = ({ isOpen, onClose, onSend }) => {
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Enviar Mensagem para {selectedUser}</h2>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Digite sua mensagem aqui..."
          />
          <button onClick={onSend}>Enviar</button>
        </div>
      </div>
    );
  };

  // Componente Modal para chats
  const ChatModal = ({ isOpen, onClose, onSend }) => {
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Enviar Mensagem para {selectedChat?.recipientId}</h2>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Digite sua mensagem aqui..."
          />
          <button onClick={onSend}>Enviar</button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-mensagem">
      <div className="sidebar-mensagem">
        <img
          src="../../public/img/Ft_cu.png"
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
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/Save.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Itens Salvos</span>
          </a>
          <a href="http://localhost:5173/perfil">
            <img
              src="../../public/img/Profile.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Perfil</span>
          </a>
          <a href="http://localhost:5173/feed">
            <img
              src="../../public/img/More.png"
              alt="HomePage Logo"
              className="homePage-logo-mensagem"
            />
            <span>Mais</span>
          </a>
        </ul>
      </div>

      <main className="content-amensagem">
        <div className="search-mensagem">
          <input
            type="text"
            placeholder="Buscar usuários"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
          />
          {searchTerm && (
            <ul className="search-results">
              {isSearching ? (
                <li>Carregando...</li> // Mostra feedback de carregamento
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
                <span className="nome-mensagem">{chat.recipientId}</span>
                <span className="tempo-mensagem">{chat.lastMessageTime}</span>
                <p className="texto-mensagem">{chat.lastMessage}</p>
              </li>
            ))
          )}
        </ul>
      </main>

      {/* Modal para envio de mensagens a usuários */}
      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSend={sendMessage} 
      />
      
      {/* Modal para envio de mensagens em chats existentes */}
      <ChatModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)} 
        onSend={sendMessage} 
      />
    </div>
  );
};

export default MensagemForm;
