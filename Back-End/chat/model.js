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

    async findUserChats() {
        if (!this.userId) {
            throw {
                code: 400,
                message: 'Usuário não informado!'
            };
        }

        try {
            console.log("entrou model")
            return await this.#repository.findUserChats(this.userId);
        } catch (error) {
            console.error('Erro ao buscar todos os chats:', error);
            throw error;
        }
    }

    async sendMessage() {
        if (!this.userId || !this.recipientId || !this.message) {
            throw {
                code: 400,
                message: 'Dados insuficientes para enviar a mensagem!'
            };
        }

        try {
            // Verifica se já existe um chat
            const chatSnapshot = await this.#repository.findChat(this.userId, this.recipientId);
            let chatId;

            if (!chatSnapshot.empty) {
                // Chat existe
                chatId = chatSnapshot.docs[0].id; // Pega o ID do chat existente
            } else {
                // Cria novo chat
                const newChatData = {
                    userId: this.userId,
                    recipientId: this.recipientId,
                    lastMessageTime: admin.firestore.Timestamp.now(),
                };
                const chatDoc = await this.#repository.createChat(newChatData);
                chatId = chatDoc.id; // Pega o ID do novo chat
            }

            // Cria a mensagem na coleção "Messages"
            const messageData = {
                chatId,
                userId: this.userId,
                recipientId: this.recipientId,
                message: this.message,
                timestamp: admin.firestore.Timestamp.now(),
                read: false,
            };

            return await this.#repository.saveMessage(messageData);
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
