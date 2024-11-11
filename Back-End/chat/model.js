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
    async findChatByParticipants() {
        if (!this.userId || !this.recipientId) {
            throw {
                code: 400,
                message: 'IDs dos participantes não foram fornecidos!'
            };
        }

        try {
            const chatSnapshot = await this.#repository.findChatByParticipants(this.userId, this.recipientId);
            if (!chatSnapshot.empty) {
                const chatData = chatSnapshot.docs[0].data();
                return { id: chatSnapshot.docs[0].id, ...chatData };
            } else {
                return null;  // Nenhum chat encontrado
            }
        } catch (error) {
            console.error('Erro ao buscar chat pelos participantes:', error);
            throw error;
        }
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
        console.log(this.message)
        if (!this.userId || !this.recipientId || !this.message) {
            throw {
                code: 400,
                message: 'Dados insuficientes para enviar a mensagem!',
                data: 'uId' + this.userId + 'recpId' + this.recipientId + 'msg' + this.message 
            };
        }
var i;
        try {
            // Verifica se já existe um chat
            const chatSnapshot = await this.#repository.findChat(this.userId, this.recipientId);

            console.log('Snap'+ chatSnapshot.docs[0])
            let chatId;

            if (!chatSnapshot.empty) {
                // Chat existe
                console.log('entrou')
                chatId = chatSnapshot.docs[0].id; // Pega o ID do chat existente
            } else {

                // Cria novo chat
                const newChatData = {
                    userId: this.userId,
                    recipientId: this.recipientId,
                    participants: [this.userId, this.recipientId].sort(),
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
            console.log('Erro ao enviar mensagem:', messageData);
            
            return await this.#repository.saveMessage(messageData);
        } catch (error) {
            
           
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
