import { FollowersRepository } from './repository.js';

export class FollowerController {
    async followUser(req, res) {
        const { userId } = req.params;
        const followerId = req.user.uid;
        try {
            const result = await FollowersRepository.followUser(userId, followerId);
            res.status(201).json({ message: 'Seguindo usuário com sucesso!', result });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao seguir usuário', error });
        }
    }

    async unfollowUser(req, res) {
        const { userId } = req.params;
        const followerId = req.user.uid;
        try {
            await FollowersRepository.unfollowUser(userId, followerId);
            res.status(200).json({ message: 'Deixou de seguir o usuário com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deixar de seguir usuário', error });
        }
    }

    async getFollowers(req, res) {
        const { userId } = req.params;
        try {
            const followers = await FollowersRepository.getFollowers(userId);
            res.json(followers);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar seguidores', error });
        }
    }

    async getFollowing(req, res) {
        const { userId } = req.params;
        try {
            const following = await FollowersRepository.getFollowing(userId);
            res.json(following);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar seguidos', error });
        }
    }
}
