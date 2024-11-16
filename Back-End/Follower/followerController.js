import { FollowersRepository } from './repository.js';

export class FollowerController {
    async followUser(req, res) {
        const { userId } = req.params; // Usuário que será seguido
        const followerId = req.user.uid; // ID do usuário logado

        if (userId === followerId) {
            return res.status(400).json({ message: 'Não é possível seguir a si mesmo!' });
        }

        try {
            const result = await FollowersRepository.followUser(userId, followerId);
            res.status(201).json({ message: 'Seguindo usuário com sucesso!', result });
        } catch (error) {
            console.error('Erro ao seguir o usuário:', error);
            res.status(500).json({ message: 'Erro ao seguir usuário', error });
        }
    }

    async unfollowUser(req, res) {
        const { userId } = req.params;
        const followerId = req.user.uid;

        if (userId === followerId) {
            return res.status(400).json({ message: 'Não é possível deixar de seguir a si mesmo!' });
        }

        try {
            await FollowersRepository.unfollowUser(userId, followerId);
            res.status(200).json({ message: 'Deixou de seguir o usuário com sucesso!' });
        } catch (error) {
            console.error('Erro ao deixar de seguir o usuário:', error);
            res.status(500).json({ message: 'Erro ao deixar de seguir usuário', error });
        }
    }

    async getFollowers(req, res) {
        const { userId } = req.params;
        try {
            const followers = await FollowersRepository.getFollowers(userId);
            res.json(followers);
        } catch (error) {
            console.error('Erro ao buscar seguidores:', error);
            res.status(500).json({ message: 'Erro ao buscar seguidores', error });
        }
    }

    async getFollowing(req, res) {
        const { userId } = req.params;
        try {
            const following = await FollowersRepository.getFollowing(userId);
            res.json(following);
        } catch (error) {
            console.error('Erro ao buscar seguidos:', error);
            res.status(500).json({ message: 'Erro ao buscar seguidos', error });
        }
    }
}
