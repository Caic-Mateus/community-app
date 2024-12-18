import { User } from './model.js';

export class UserController {
    async findUsers(request, response) {
        const user = new User();
        user.user = request.user;

        try {
            const users = await user.findUsers();
            response.json(users);
        } catch (error) {
            response.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }

    async countUsers(request, response) {
        try {
            const user = new User();
            const count = await user.countUsers();
            response.status(200).json({ totalUsers: count });
        } catch (error) {
            console.error('Erro ao contar usuários:', error);
            response.status(500).json({
                message: 'Erro ao contar usuários',
                error: error.message,
            });
        }
    }

    
    async updateUser(request, response) {
        const { userId } = request.params;
        const userData = request.body;
    
        if (!userId) {
            return response.status(400).json({ message: "O ID do usuário é obrigatório." });
        }
    
        try {
            const userModel = new User();
            const updatedUser = await userModel.updateUser(userId, userData);
            response.status(200).json({
                message: "Usuário atualizado com sucesso!",
                user: updatedUser,
            });
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
            response.status(500).json({ 
                message: "Erro ao atualizar usuário", 
                error: error.message 
            });
        }
    }
    
    async findUsersByName(request, response) {
        const { name } = request.query;
        if (!name) {
            return response.status(400).json({ message: "O parâmetro 'name' é obrigatório." });
        }

        try {
            const user = new User();
            const users = await user.findUsersByName(name);
            response.json(users);
        } catch (error) {
            response.status(500).json({ message: 'Error fetching users by name', error: error.message });
        }
    }

    async createUser(request, response) {
        const { email, password, name, avatarUrl, curso, date_Nasc, registrationDate, telefone, user } = request.body;
        const userModel = new User();

        try {
            const newUser = await userModel.createUser({ email, password, name, avatarUrl, curso, date_Nasc, registrationDate, telefone, user });
            response.status(201).json({
                message: 'Usuário criado com sucesso!',
                user: newUser
            });
        } catch (error) {
            response.status(500).json({
                message: 'Erro ao criar usuário',
                error: error.message
            });
        }
    }
    getUserById = async (request, response) => {
        const userId  = request.params.userId;
        
        try {
            const user = new User();
            const userData = await user.getUserById(userId);
            response.status(200).json(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
            response.status(500).json({ error: error.message });
        }
    };
}
