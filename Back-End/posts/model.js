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
    // model.js
async savePost(userId, postId) {
    if (!userId || !postId) {
        throw {
            code: 400,
            message: 'UserId ou PostId não informados!',
        };
    }

    try {
        // Chama o método correspondente na Repository
        await this.#repository.savePost(userId, postId);
    } catch (error) {
        console.error('Erro no model ao salvar post:', error);
        throw error;
    }
}

// Novo método para buscar os IDs dos posts salvos
async findSavedPostsByUserId(userId) {
    if (!userId) {
        throw {
            code: 500,
            message: 'Usuário não informado!'
        };
    }

    try {
        const snapshot = await admin.firestore()
            .collection('PostsSaves')
            .where('userId', '==', userId)
            .get();

        return snapshot.docs.map(doc => doc.data().postId); // Retorna os postIds salvos
    } catch (error) {
        console.error('Erro ao buscar posts salvos:', error);
        throw error;
    }
}
async findUserById(userId) {
    try {
        const userDoc = await admin.firestore().collection('Users').doc(userId).get();
        if (userDoc.exists) {
            return { ...userDoc.data(), uid: userDoc.id };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
}
// Novo método para buscar os posts a partir dos postIds
async findPostsByIds(postIds) {
    if (!Array.isArray(postIds) || postIds.length === 0) {
        throw {
            code: 400,
            message: 'Post IDs não encontrados!'
        };
    }

    try {
        const snapshot = await admin.firestore()
            .collection('Posts')
            .where('postId', 'in', postIds) // Faz a busca pelos postIds
            .get()
            .then(async snapshot => {
                const postsData = [];
                for (const doc of snapshot.docs) {
                    const postData = { ...doc.data(), uid: doc.id };
                    const userData = await this.findUserById(postData.userId);
                    postData.user = userData; // Adicionar dados do usuário ao objeto de postagem
                    postsData.push(postData);
                }
                return postsData;
            });

        return snapshot;
    } catch (error) {
        console.error('Erro ao buscar posts por IDs:', error);
        throw error;
    }
}


}
