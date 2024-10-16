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
