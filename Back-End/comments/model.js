import admin from 'firebase-admin';
import { CommentRepository } from './repository.js';

export class Comment {
    commentId;
    postId;
    userId;
    commentText;
    commentDateTime;
    countLikes;

    #repository;

    constructor() {
        this.#repository = new CommentRepository();
    }

    async createComment(commentData) {
        try {
            // Adiciona o ID do comentário aos dados do comentário
            commentData.commentId = this.commentId;

            return await this.#repository.createComment(commentData);
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }
}
