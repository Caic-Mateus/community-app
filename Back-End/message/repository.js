import admin from 'firebase-admin';

export class MessageRepository {
    // Buscar mensagens pelo chatId
    async findMessagesByChatId(chatId) {
        const messagesSnapshot = await admin.firestore()
            .collection('Messages')
            .where('chatId', '==', chatId)
            .orderBy('timestamp')
            .get();
    
        const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
        // Array para armazenar as promessas de busca dos nomes
        const messagesWithUserNames = await Promise.all(
            messages.map(async (message) => {
                const userRef = admin.firestore().collection('Users').doc(message.userId);
                const recipientRef = admin.firestore().collection('Users').doc(message.recipientId);
    
                // Busca os dados dos usuários
                const userDoc = await userRef.get();
                const recipientDoc = await recipientRef.get();
    
                // Adiciona o nome do usuário e do destinatário na mensagem
                return {
                    ...message,
                    userName: userDoc.exists ? userDoc.data().name : null,
                    recipientName: recipientDoc.exists ? recipientDoc.data().name : null
                };
            })
        );
    
        return messagesWithUserNames;
    }
    
}
