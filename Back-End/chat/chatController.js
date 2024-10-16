import { Chat } from './model.js';

export class ChatController {
    // Enviar mensagem entre dois usuários
    sendMessage = async (req, res) => {
        const chat = new Chat();
        chat.userId = req.user.uid; // Usuário autenticado
        chat.recipientId = req.body.recipientId; // Destinatário da mensagem
        chat.message = req.body.message;

        try {
            const messageId = await chat.sendMessage();
            res.status(201).json({ message: 'Mensagem enviada com sucesso!', messageId });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao enviar mensagem', error: error.message });
        }
    };

    // Buscar histórico de conversas entre dois usuários
    getMessages = async (req, res) => {
        const chat = new Chat();
        chat.userId = req.user.uid; // Usuário autenticado
        chat.recipientId = req.params.recipientId; // Usuário com quem ele está conversando

        try {
            const messages = await chat.getMessagesBetweenUsers();
            res.json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar mensagens', error: error.message });
        }
    };

   async getUserChats(req, res) {
    
    const chat = new Chat();
    chat.userId = req.params.userId; // Pegando o ID do usuário da URL
    try {
        const chats = await chat.findUserChats(chat.userId); // Chama a função do repositório
        if (chats.length === 0) {
            return res.status(404).json({ message: "Nenhum chat encontrado." });
        }
        res.status(200).json(chats);
    } catch (error) {
        console.error("Error fetching user chats:", error);
        res.status(500).json({ error: "Erro ao buscar chats." });
    }
}
    
}
