import admin from 'firebase-admin';
import { LikeRepository } from './repository.js';

export class Like {
    userId;
    postId;

    #repository;

    constructor() {
        this.#repository = new LikeRepository();
    }

    async toggleLike(likeData) {
        try {
            // Verifica se o like já existe
            const likeDocId = await this.#repository.checkLikeExists(likeData.userId, likeData.postId);
            if (likeDocId) {
                // Se o like existir, remove-o e decrementa o countLikes
                await this.#repository.deleteLike(likeDocId);
                await this.#repository.decrementPostLikes(likeData.postId);

                return {
                    success: true,
                    message: 'Like removido com sucesso!'
                };
            } else {
                // Se o like não existir, cria-o e incrementa o countLikes
                await this.#repository.createLike(likeData);
                await this.#repository.incrementPostLikes(likeData.postId);

                return {
                    success: true,
                    message: 'Like criado com sucesso!'
                };
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            throw error;
        }
    }
}
