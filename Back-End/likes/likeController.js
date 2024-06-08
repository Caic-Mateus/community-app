import { Like } from './model.js';

export class LikeController {
    toggleLike = async (request, response) => {
        console.log('POST');
        const like = new Like();

        // Recupera os dados do like do corpo da requisição
        const { userId, postId } = request.body;

        const likeData = {
            userId: userId,
            postId: postId
        };

        try {
            const result = await like.toggleLike(likeData);
            response.status(200).json(result);
        } catch (error) {
            console.error('Error toggling like:', error);
            response.status(500).json({ message: error.message });
        }
    }
}
