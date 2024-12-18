import express from 'express';
import { ChatController } from './chatController.js';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';

const router = express.Router();
const chatController = new ChatController();

// Rota para enviar mensagem
router.post('/send', chatController.sendMessage);

// Rota para buscar histórico de mensagens entre dois usuários
//router.get('/:recipientId', autheticateToken, chatController.getMessages);

router.get('/:userId', autheticateToken, chatController.getUserChats);

router.post('/find-chat', chatController.findChatByParticipants);

export const chatRouter = router;
