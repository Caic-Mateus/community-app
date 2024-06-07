import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { CommentController } from './commentController.js';


const app = express();

const commentController = new CommentController();

app.post('/', autheticateToken, commentController.createComment);
export const commentsRouter = app;