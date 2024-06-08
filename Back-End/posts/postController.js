import { Post } from './model.js';

export class PostController {
    findPostsById = (request, response) => {
        console.log('GET');
        const post = new Post();

        post.userId = request.user.uid;

        post.findPostById()
            .then(posts => {
                response.json(posts);
            })
            .catch(error => {
                console.log('Error fetching posts:', error);
                response.status(500).json(error);
            });
    }

    findPostsByPostId = (request, response) => {
        console.log('GET');
        const post = new Post();

        post.userId = request.user.uid;

        const postId = request.params.postId;

        post.findPostByPostId(postId)
            .then(posts => {
                response.json(posts);
            })
            .catch(error => {
                console.log('Error fetching posts:', error);
                response.status(500).json(error);
            });
    }

    createPost = (request, response) => {
        console.log('POST');
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
                console.log('Error creating post:', error);
                response.status(500).json(error);
            });
    }
}
