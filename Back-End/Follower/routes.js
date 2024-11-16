import express from 'express';
import { FollowerController } from './followerController.js';

const router = express.Router();
const followerController = new FollowerController();

// Rota para seguir um usuário
router.post('/:userId/follow', autheticateToken, followerController.followUser);

// Rota para deixar de seguir um usuário
router.delete('/:userId/unfollow', followerController.unfollowUser);

// Rota para buscar seguidores de um usuário
router.get('/:userId/followers', followerController.getFollowers);

// Rota para buscar usuários que o usuário segue
router.get('/:userId/following', followerController.getFollowing);

export const followersRouter = router;
