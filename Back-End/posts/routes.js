import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { PostController } from './postController.js';


const app = express();

const postController = new PostController();

app.get("/", autheticateToken, postController.findPostsById)

export const postsRouter = app;