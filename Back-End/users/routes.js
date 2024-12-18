import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { UserController } from './userController.js';

const app = express();

const userController = new UserController();

app.get("/", autheticateToken, userController.findUsers)

app.post("/create", userController.createUser);
app.put('/:userId', autheticateToken, userController.updateUser);
app.get('/count', autheticateToken, userController.countUsers);
app.get('/search', autheticateToken, userController.findUsersByName);
app.get('/:userId', autheticateToken,userController.getUserById);
export const usersRouter = app;