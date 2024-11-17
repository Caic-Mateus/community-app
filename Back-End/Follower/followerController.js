import { Follower } from './model.js';

export class FollowerController {
    toggleFollow = async (request, response) => {
        console.log('POST /toggleFollow');
        const follower = new Follower();

        // Recupera os dados do corpo da requisição
        const { userId, targetUserId } = request.body;

        const followData = {
            userId: userId,           // Quem está seguindo
            targetUserId: targetUserId // Quem está sendo seguido
        };

        try {
            const result = await follower.toggleFollow(followData);
            response.status(200).json(result);
        } catch (error) {
            console.error('Error toggling follow:', error);
            response.status(500).json({ message: error.message });
        }
    }
    async getFollowerCount(req, res) {
        const { userId } = req.params;
        const follower = new Follower();
    
        try {
          const count = await follower.getFollowerCount(userId);
          res.status(200).json({ followers: count });
        } catch (error) {
          console.error('Erro ao obter contagem de seguidores:', error);
          res.status(500).json({ message: 'Erro ao obter contagem de seguidores.' });
        }
      }
    
      async getFollowingCount(req, res) {
        const { userId } = req.params;
        const follower = new Follower();
    
        try {
          const count = await follower.getFollowingCount(userId);
          res.status(200).json({ following: count });
        } catch (error) {
          console.error('Erro ao obter contagem de seguidos:', error);
          res.status(500).json({ message: 'Erro ao obter contagem de seguidos.' });
        }
      }

      checkFollowStatus = async (request, response) => {
        const { userId, targetUserId } = request.params; // Captura os parâmetros da URL

        const followers = new Follower();
        try {
            const isFollowing = await followers.checkIfFollowing(userId, targetUserId);
            response.status(200).json({ isFollowing });
        } catch (error) {
            console.error('Error checking follow status:', error);
            response.status(500).json({ message: error.message });
        }
    }
}
