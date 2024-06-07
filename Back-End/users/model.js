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

    async findUsers() {
        return this.#repository.findUsers();
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
