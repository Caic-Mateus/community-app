import admin from 'firebase-admin';

export class ChatRepository {
    // Salvar mensagem no Firestore
    async saveMessage(chatData) {
        try {
            const chatDoc = await admin.firestore().collection('Chats').add(chatData);
            return chatDoc.id;
        } catch (error) {
            console.error('Erro ao salvar mensagem:', error);
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
}
