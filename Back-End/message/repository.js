import admin from 'firebase-admin';

export class MessageRepository {
    // Buscar mensagens pelo chatId
    async findMessagesByChatId(chatId) {
        const messagesSnapshot = await admin.firestore()
            .collection('Messages')
            .where('chatId', '==', chatId)
            .orderBy('timestamp')
            .get();

        return messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Retorna as mensagens
    }
}
