import { Message } from './model.js';

export class MessageController {
    // Buscar histórico de mensagens usando um chatId
    getMessages = async (req, res) => {
        const chatId = req.params.chatId; // Obtem o chatId da requisição

        try {
            const messages = await Message.getMessagesByChatId(chatId); // Busca mensagens pelo chatId
            res.json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar mensagens', error: error.message });
        }
    };
}
