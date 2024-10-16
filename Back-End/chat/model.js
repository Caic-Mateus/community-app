import admin from 'firebase-admin';
import { ChatRepository } from './repository.js';

export class Chat {
    userId;
    recipientId;
    message;
    timestamp;

    #repository;

    constructor() {
        this.#repository = new ChatRepository();
    }

    // Enviar mensagem
    async sendMessage() {
        if (!this.userId || !this.recipientId || !this.message) {
            throw {
                code: 400,
                message: 'Dados insuficientes para enviar a mensagem!'
            };
        }

        const chatData = {
            userId: this.userId,
            recipientId: this.recipientId,
            message: this.message,
            timestamp: admin.firestore.Timestamp.now(),
        };

        try {
            return await this.#repository.saveMessage(chatData);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }

    // Buscar histórico de conversas entre dois usuários
    async getMessagesBetweenUsers() {
        if (!this.userId || !this.recipientId) {
            throw {
                code: 400,
                message: 'IDs dos usuários não fornecidos!'
            };
        }

        try {
            return await this.#repository.findMessages(this.userId, this.recipientId);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            throw error;
        }
    }
}
