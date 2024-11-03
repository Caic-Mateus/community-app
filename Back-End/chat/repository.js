import admin from 'firebase-admin';

export class ChatRepository {
    // Salvar mensagem no Firestore
    async saveMessage(messageData) {
        try {
            const messageDoc = await admin.firestore().collection('Messages').add(messageData);
            return messageDoc.id;
        } catch (error) {
            console.error('Erro ao salvar mensagem:', error);
            throw error;
        }
    }
    //erro aqui
    async findChat(userId, recipientId) {
        try {
            const participants = [userId, recipientId].sort();
            return await admin.firestore()
                .collection('Chats')
                .where('participants', '==', participants)
                .get();
        } catch (error) {
            console.error('Erro ao buscar chat:', error);
            throw error;
        }
    }
    async createChat(chatData) {
        try {
            console.log('entou chat')
            const chatDoc = await admin.firestore().collection('Chats').add(chatData);

            console.log('criou chat')
            return chatDoc;

        } catch (error) {
            console.error('Erro ao criar chat:', error);
            throw error;
        }
    }


    // Buscar mensagens entre dois usuários
    async findMessages(userId, recipientId) {
        try {
            const messages = await admin.firestore()
                .collection('Chats')
                .where('userId', 'in', [userId, recipientId])
                .where('recipientId', 'in', [userId, recipientId])
                .orderBy('timestamp', 'asc')
                .get();

            return messages.docs.map(doc => doc.data());
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            throw error;
        }
    }

    async findUserChats(userId) {
        try {
            console.log("entrou repos")
            // Buscando chats onde o userId é o remetente ou o destinatário
            const chatsRef = admin.firestore().collection("Chats");
            
            const snapshot = await chatsRef
                .where("userId", "==", userId)
                .get();
            console.log("schat:")
            console.log(snapshot);
            const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            const recipientChatsSnapshot = await chatsRef
                .where("recipientId", "==", userId)
                .get();
    
            const recipientChats = recipientChatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            // Unindo as mensagens de ambos os casos
            return [...chats, ...recipientChats];
        } catch (error) {
            console.error('Erro ao buscar chats do usuário:', error);
            throw error;
        }
    }
    
}
