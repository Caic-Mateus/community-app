// bugController.js
import { Bug } from './model.js';

export class BugController {
    async createBug(request, response) {
        const { bugDescription, reporterUserId } = request.body;
        const bugModel = new Bug();

        try {
            const newBug = await bugModel.createBug({ bugDescription, reporterUserId });
            response.status(201).json({
                message: 'Bug reportado com sucesso!',
                bug: newBug
            });
        } catch (error) {
            response.status(500).json({
                message: 'Erro ao reportar bug',
                error: error.message
            });
        }
    }

    async findBugs(request, response) {
        const bugModel = new Bug();

        try {
            const bugs = await bugModel.findBugs();
            response.json(bugs);
        } catch (error) {
            response.status(500).json({ message: 'Erro ao buscar bugs', error: error.message });
        }
    }

    async getBugById(request, response) {
        const bugId = request.params.bugId;
        
        try {
            const bug = await new Bug().getBugById(bugId);
            response.status(200).json(bug);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
}
