import { DenunciaRepository } from './repository.js';

export class Denuncia {
    denunciaText;
    denouncedUserName; // Nome de usuário do denunciado
    denouncedUserId; // ID do usuário que está fazendo a denúncia
    status; // Status da denúncia (Pendente, Resolvida, etc.)
    date;

    #repository;

    constructor() {
        this.#repository = new DenunciaRepository();
    }

    async createDenuncia(denunciaData) {
        const { denunciaText, denouncedUserName, denouncerUserId, status, date } = denunciaData;
        const newDenuncia = { denunciaText, denouncedUserName, denouncerUserId, status, date };

        try {
            await this.#repository.saveDenunciaInFirestore(newDenuncia);
            return newDenuncia;
        } catch (error) {
            throw new Error(`Error creating denuncia: ${error.message}`);
        }
    }

    async findDenuncias() {
        return this.#repository.findDenuncias();
    }

    async getDenunciaById(denunciaId) {
        return this.#repository.getDenunciaById(denunciaId);
    }
}
