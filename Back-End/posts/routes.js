import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { PostController } from './postController.js';


const app = express();

const postController = new PostController();

app.get("/", autheticateToken, postController.findPostsById)

app.post('/', autheticateToken, postController.createPost);
export const postsRouter = app;