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
    async getCommentsByPostId(postId) {
        try {
            const commentsRef = admin.firestore().collection('Comments').where('postId', '==', postId);
            const snapshot = await commentsRef.get();
            if (snapshot.empty) {
                return [];
            }

            const comments = [];
            snapshot.forEach(doc => {
                comments.push(doc.data());
            });

            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments: ${error.message}`);
        }
    }
}
