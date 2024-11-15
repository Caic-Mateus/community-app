import admin from 'firebase-admin';
import { UserRepository } from './repository.js';

export class User {
    avatarUrl;
    curso;
    date_Nasc;
    email;
    password;
    registrationDate;
    telefone;
    user;
    userId;
    name;

    #repository;

    constructor() {
        this.#repository = new UserRepository();
    }

    async updateUser(userId, userData) {
        try {
            return await this.#repository.updateUser(userId, userData);
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
            throw error;
        }
    }
    
    async findUsers() {
        return this.#repository.findUsers();
    }
    async getUserById(userId) {
        try {
            return await this.#repository.getUserById(userId);
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    async findUsersByName(name) {
        try {
            return await this.#repository.findUsersByName(name);
        } catch (error) {
            console.error('Error fetching users by name:', error);
            throw error;
        }
    }


    async createUser(userData) {
        const { email, password, name, avatarUrl, curso, date_Nasc, registrationDate, telefone, user } = userData;
        const newUser = { email, name, avatarUrl, curso, date_Nasc, registrationDate, telefone, user };

        try {
            const userRecord = await this.#repository.createUserInAuth(email, password);
            newUser.userId = userRecord.uid; // Usar o uid do Firebase Authentication
            await this.#repository.saveUserInFirestore(newUser);
            return newUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
}
