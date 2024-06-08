import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { PostController } from './postController.js';


const app = express();

const postController = new PostController();

app.get("/", autheticateToken, postController.findPostsById)
app.get("/allposts", autheticateToken, postController.findPosts)
app.get("/:postId", autheticateToken, postController.findPostsByPostId)
app.post('/', autheticateToken, postController.createPost);
export const postsRouter = app;