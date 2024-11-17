import { FollowerRepository } from './repository.js';

export class Follower {
    userId;
    targetUserId;

    #repository;

    constructor() {
        this.#repository = new FollowerRepository();
    }

    async toggleFollow(followData) {
        try {
            // Verifica se a relação já existe
            const followDocId = await this.#repository.checkFollowExists(followData.userId, followData.targetUserId);
            if (followDocId) {
                // Se já existe, remove a relação
                await this.#repository.deleteFollow(followDocId);
                return {
                    success: true,
                    message: 'Deixou de seguir o usuário com sucesso!'
                };
            } else {
                // Caso contrário, cria a relação
                await this.#repository.createFollow(followData);
                return {
                    success: true,
                    message: 'Seguiu o usuário com sucesso!'
                };
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            throw error;
        }
    }

    async getFollowerCount(targetUserId) {
        try {
          return await this.#repository.countFollowers(targetUserId);
        } catch (error) {
          console.error('Erro ao obter contagem de seguidores:', error);
          throw error;
        }
      }
    
      async getFollowingCount(userId) {
        try {
          return await this.#repository.countFollowing(userId);
        } catch (error) {
          console.error('Erro ao obter contagem de seguidos:', error);
          throw error;
        }
      }

      async checkIfFollowing(userId, targetUserId) {
        try {
            // Chama o repositório para verificar a relação de seguir
            const isFollowing = await this.#repository.checkIfFollowing(userId, targetUserId);
            return isFollowing;
        } catch (error) {
            console.error('Error checking follow status:', error);
            throw error;
        }
    }
}
