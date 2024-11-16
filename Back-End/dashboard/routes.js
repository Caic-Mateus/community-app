import express from 'express';
import { autheticateToken } from '../middlewares/authenticate-jwt.js';
import { DashboardController } from './dashboardController.js';

const dashboardController = new DashboardController();
const app = express();

app.get('/dashboard', (req, res) => dashboardController.getDashboardData(req, res));

export const dashboardRouter = app;
