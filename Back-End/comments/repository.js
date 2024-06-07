import admin from 'firebase-admin';

export class CommentRepository {
    async createComment(commentData) {
        try {
            const docRef = await admin.firestore().collection('Comments').doc(); // Gera o ID automaticamente
            commentData.commentId = docRef.id; // Define o commentId com o ID do documento
            await docRef.set(commentData); // Define os dados do comentário no documento criado
            return docRef.id; // Retorna o ID do documento criado
        } catch (error) {
            throw new Error(`Error creating comment: ${error.message}`);
        }
    }
}
