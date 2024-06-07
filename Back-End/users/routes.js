import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { UserController } from './userController.js';

const app = express();

const userController = new UserController();

app.get("/", autheticateToken, userController.findUsers)

app.post("/create", userController.createUser)

export const usersRouter = app;