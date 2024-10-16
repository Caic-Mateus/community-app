import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import { createServer } from 'http'; // Importar para criar o servidor HTTP
import { Server } from 'socket.io';  // Importar o socket.io
import bodyParser from 'body-parser';

// Importar rotas
import { usersRouter } from './users/routes.js';
import { postsRouter } from './posts/routes.js';
import { commentsRouter } from './comments/routes.js';
import { likeRouter } from './likes/routes.js';
import { chatRouter } from './chat/routes.js'; // Adicionar as rotas de chat

const app = express();
const server = createServer(app); // Criar o servidor HTTP com base no Express
const io = new Server(server, {   // Configurar o socket.io para usar o servidor HTTP
  cors: {
    origin: 'http://localhost:5173', // O domínio do seu frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Configurar Body Parser
app.use(bodyParser.json());

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert("database.json")
});

// Adicionar rotas
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likeRouter);
app.use('/chat', chatRouter);  // Adicionar rotas de chat

// Adicionar a funcionalidade de socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('Mensagem recebida:', msg);
    io.emit('chat message', msg); // Enviar a mensagem para todos os clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log('Aplicação e servidor de WebSocket iniciados na porta 3000');
});
