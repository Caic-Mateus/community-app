import express from 'express';
import { LikeController } from './likeController.js';

const router = express.Router();
const likeController = new LikeController();

router.post('/', likeController.toggleLike);

export const likeRouter = router;
