// model.js
import { BugRepository } from './repository.js';

export class Bug {
    bugDescription; // Descrição do bug
    reporterUserId; // ID do usuário que está reportando

    #repository;

    constructor() {
        this.#repository = new BugRepository();
    }

    async createBug(bugData) {
        const { bugDescription, reporterUserId } = bugData;
        const newBug = { bugDescription, reporterUserId };

        try {
            await this.#repository.saveBugInFirestore(newBug);
            return newBug;
        } catch (error) {
            throw new Error(`Error creating bug: ${error.message}`);
        }
    }

    async findBugs() {
        return this.#repository.findBugs();
    }

    async getBugById(bugId) {
        return this.#repository.getBugById(bugId);
    }
}
