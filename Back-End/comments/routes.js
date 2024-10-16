import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { CommentController } from './commentController.js';


const app = express();

const commentController = new CommentController();

app.post('/', autheticateToken, commentController.createComment);
app.get('/:postId', autheticateToken, commentController.getCommentsByPostId);
export const commentsRouter = app;