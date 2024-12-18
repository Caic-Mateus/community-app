import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { PostController } from './postController.js';

const app = express();

const postController = new PostController();

// Nova rota para buscar posts de um usuário específico
app.get("/user/:userId", autheticateToken, postController.findPostsByUserId); // Rota que recebe o userId

// Outras rotas
app.get("/", autheticateToken, postController.findPostsById);
app.get("/allposts", autheticateToken, postController.findPosts);
app.get("/:postId", autheticateToken, postController.findPostsByPostId);
app.post('/', autheticateToken, postController.createPost);
app.post('/save', autheticateToken, postController.savePost);
// Rota para buscar posts salvos por um usuário específico
app.get("/saved/:userId", autheticateToken, postController.findSavedPostsByUserId);

export const postsRouter = app;
