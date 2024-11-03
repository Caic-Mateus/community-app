import admin from 'firebase-admin';
import { MessageRepository } from './repository.js';

export class Message {
    userId;
    recipientId;
    message;
    read;
    chatId;
    timestamp;

    #repository;

    constructor() {
        this.#repository = new MessageRepository();
    }

    // Buscar mensagens por chatId
    static async getMessagesByChatId(chatId) {
        if (!chatId) {
            throw {
                code: 400,
                message: 'chatId não fornecido!'
            };
        }

        try {
            const repository = new MessageRepository();
            return await repository.findMessagesByChatId(chatId); // Chama o repositório para buscar mensagens
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            throw error;
        }
    }
}
