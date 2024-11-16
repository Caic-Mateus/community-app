import { Post } from './model.js';

export class PostController {
    // Função para buscar posts de um usuário específico
    findPostsByUserId = (request, response) => {
        console.log('GET - Buscar posts por UserId');
        const post = new Post();
        
        const userId = request.params.userId; // Pega o userId da URL

        if (!userId) {
            return response.status(400).json({ message: 'User ID é obrigatório' });
        }

        post.userId = userId;

        post.findPostByUserId() // Usamos o novo método findPostByUserId que vamos adicionar no model
            .then(posts => {
                response.json(posts);
            })
            .catch(error => {
                console.log('Erro ao buscar posts:', error);
                response.status(500).json(error);
            });
    }

    // Função existente para buscar posts do usuário logado
    findPostsById = (request, response) => {
        console.log('GET - Buscar posts do usuário logado');
        const post = new Post();

        post.userId = request.user.uid;

        post.findPostById()
            .then(posts => {
                response.json(posts);
            })
            .catch(error => {
                console.log('Erro ao buscar posts:', error);
                response.status(500).json(error);
            });
    }

    // Função para buscar posts por postId
    findPostsByPostId = (request, response) => {
        console.log('GET - Buscar post por PostId');
        const post = new Post();

        post.userId = request.user.uid;

        const postId = request.params.postId;

        post.findPostByPostId(postId)
            .then(posts => {
                response.json(posts);
            })
            .catch(error => {
                console.log('Erro ao buscar posts:', error);
                response.status(500).json(error);
            });
    }

    // Função para criar um post
    createPost = (request, response) => {
        console.log('POST - Criar post');
        const post = new Post();

        post.userId = request.user.uid;

        post.createPost(request.body)
            .then(postId => {
                response.status(201).json({
                    message: 'Post criado com sucesso!',
                    postId: postId
                });
            })
            .catch(error => {
                console.log('Erro ao criar post:', error);
                response.status(500).json(error);
            });
    }

    // Função para listar todos os posts (geral)
    async findPosts(request, response) {
        const post = new Post();
        try {
            post.userId = request.user.uid;
            const posts = await post.findPosts();
            response.json(posts);
        } catch (error) {
            response.status(500).json({ message: 'Erro ao buscar posts', error: error.message });
        }
    }
}
