import express from 'express';
import { FollowerController } from './followerController.js';

const router = express.Router();
const followerController = new FollowerController();

router.post('/toggleFollow', followerController.toggleFollow);

router.get('/followers/:userId/count', (req, res) =>
    followerController.getFollowerCount(req, res)
  );
  
  router.get('/following/:userId/count', (req, res) =>
    followerController.getFollowingCount(req, res)
  );
  router.get('/followers/:userId/check/:targetUserId', followerController.checkFollowStatus);

export const followersRouter = router;
