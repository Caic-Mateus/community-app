import admin from 'firebase-admin';
import { PostRepository } from './repository.js';

export class Post {
    commentsCount;
    context;
    likesCount;
    postDateTime;
    postId;
    userId;

    #repository;

    constructor() {
        this.#repository = new PostRepository();
    }

    async findPostById() {
        if (!this.userId) {
            throw {
                code: 500,
                message: 'Usuário não informado!'
            };
        }

        try {
            return await this.#repository.findMyPosts(this.userId);
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }
    async createPost(postData) {
        if (!this.userId) {
            throw {
                code: 500,
                message: 'Usuário não informado!'
            };
        }
        try {
            // Adiciona o ID do post aos dados do post
            postData.postId = this.postId;

            return await this.#repository.createPost(postData);
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }
}
