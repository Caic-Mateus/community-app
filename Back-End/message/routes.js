import express from 'express';
import { MessageController } from './messageController.js';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';

const router = express.Router();
const messageController = new MessageController();

// Atualizando a rota para buscar mensagens por chatId
router.get('/messages/:chatId', autheticateToken, messageController.getMessages);

export const messageRouter = router;
