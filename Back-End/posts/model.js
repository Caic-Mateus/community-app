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
            console.error('Erro ao buscar posts:', error);
            throw error;
        }
    }

    async findPostByPostId(postId) {
        if (!this.userId) {
            throw {
                code: 500,
                message: 'Usuário não informado!'
            };
        }

        try {
            return await this.#repository.findPostsByPostId(postId);
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            throw error;
        }
    }

    // Novo método para buscar posts por userId
    async findPostByUserId() {
        if (!this.userId) {
            throw {
                code: 500,
                message: 'Usuário não informado!'
            };
        }

        try {
            return await this.#repository.findPostsByUserId(this.userId); // Método da repository
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            throw error;
        }
    }

    async findPosts() {
        if (!this.userId) {
            throw {
                code: 500,
                message: 'Usuário não informado!'
            };
        }

        try {
            return await this.#repository.findPosts();
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
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
            postData.postId = this.postId;
            postData.registrationDate = admin.firestore.Timestamp.now();
            return await this.#repository.createPost(postData);
        } catch (error) {
            console.error('Erro ao criar post:', error);
            throw error;
        }
    }
}
