import { Comment } from './model.js';
import admin from 'firebase-admin';


export class CommentController {
    createComment = (request, response) => {
        console.log('POST');
        const comment = new Comment();

        // Recupera os dados do comentário do corpo da requisição
        const { postId, userId, commentText } = request.body;

        // Define os dados do comentário
        const commentData = {
            postId: postId,
            userId: userId,
            commentText: commentText,
            commentDateTime: admin.firestore.Timestamp.now(),
            countLikes: 0
        };

        comment.createComment(commentData)
            .then(commentId => {
                response.status(201).json({
                    message: 'Comentário criado com sucesso!',
                    commentId: commentId
                });
            })
            .catch(error => {
                console.error('Error creating comment:', error);
                response.status(500).json(error);
            });
    }
}
