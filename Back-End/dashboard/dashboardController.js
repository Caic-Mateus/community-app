import { DashboardRepository } from './repository.js';

export class DashboardController {
    async getDashboardData(req, res) {
        try {
            const repository = new DashboardRepository();

            const totalUsers = await repository.countDocuments('Users');
            const totalPosts = await repository.countDocuments('Posts');
            const totalComments = await repository.countDocuments('Comments');
            const totalLikes = await repository.countDocuments('Likes');
            const totalBugs = await repository.countDocuments('Bugs');
            const totalDenuncias = await repository.countDocuments('Denuncias');

            res.status(200).json({
                totalUsers,
                totalPosts,
                totalComments,
                totalLikes,
                totalBugs,
                totalDenuncias,
            });
        } catch (error) {
            console.error("Erro ao buscar dados do painel:", error);
            res.status(500).json({ message: "Erro ao buscar dados do painel." });
        }
    }
}
