import express from 'express';
import admin from 'firebase-admin'
import cors from 'cors';

import { autheticateToken } from './middlewares/authenticate-jwt.js';
import { PostController } from './posts/postController.js';
import { usersRouter } from './users/routes.js';
import {postsRouter} from './posts/routes.js'
import { commentsRouter } from './comments/routes.js';
import { likeRouter } from './likes/routes.js';

import bodyParser from 'body-parser';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',  // Permitir solicitações deste domínio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Permitir envio de cookies e cabeçalhos de autorização
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
  
const postController = new PostController();


admin.initializeApp({
    credential: admin.credential.cert("database.json")
})
app.use(bodyParser.json());
app.use('/users', usersRouter)
app.use("/posts", postsRouter)
app.use("/comments", commentsRouter)
app.use("/likes", likeRouter)


app.listen(3000,() => console.log('Aplicação iniciada.'))