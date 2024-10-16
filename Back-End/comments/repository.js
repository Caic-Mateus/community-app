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
            const commentsRef = admin.firestore().collection('Comments').where('postId', '==', postId).orderBy('commentDateTime', 'desc');
            const snapshot = await commentsRef.get();
            if (snapshot.empty) {
                return [];
            }
    
            const comments = [];
            for (const doc of snapshot.docs) {
                const commentData = doc.data();
                // Buscar o usuário associado a este comentário pelo userId
                const userRef = await admin.firestore().collection('Users').doc(commentData.userId).get();
                const userData = userRef.data();
                const commentWithUser = { ...commentData, user: userData };
                comments.push(commentWithUser);
            }
    
            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments: ${error.message}`);
        }
    }
    
}
