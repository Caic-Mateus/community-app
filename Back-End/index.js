import express from 'express';
import admin from 'firebase-admin'
import { autheticateToken } from './middlewares/authenticate-jwt.js';
import { PostController } from './posts/postController.js';
import { usersRouter } from './users/routes.js';
import {postsRouter} from './posts/routes.js'
import { commentsRouter } from './comments/routes.js';

import bodyParser from 'body-parser';

const app = express();

const postController = new PostController();


admin.initializeApp({
    credential: admin.credential.cert("database.json")
})
app.use(bodyParser.json());
app.use('/users', usersRouter)
app.use("/posts", postsRouter)
app.use("/comments", commentsRouter)

app.listen(3000,() => console.log('Aplicação iniciada.'))