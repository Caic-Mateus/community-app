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
    getCommentsByPostId = async (request, response) => {
        const postId = request.params.postId;
        
        try {
            const comment = new Comment();
            const comments = await comment.getCommentsByPostId(postId);
            response.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            response.status(500).json({ error: error.message });
        }
    };
}
