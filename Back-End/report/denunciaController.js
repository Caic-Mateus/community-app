import { Denuncia } from './model.js';

export class DenunciaController {
    async createDenuncia(request, response) {
        const { denunciaText, denouncedUserName, denouncerUserId, status, date } = request.body;
        const denunciaModel = new Denuncia();

        try {
            const newDenuncia = await denunciaModel.createDenuncia({ denunciaText, denouncedUserName, denouncerUserId, status, date });
            response.status(201).json({
                message: 'Denúncia criada com sucesso!',
                denuncia: newDenuncia
            });
        } catch (error) {
            response.status(500).json({
                message: 'Erro ao criar denúncia',
                error: error.message
            });
        }
    }

    async findDenuncias(request, response) {
        const denunciaModel = new Denuncia();

        try {
            const denuncias = await denunciaModel.findDenuncias();
            response.json(denuncias);
        } catch (error) {
            response.status(500).json({ message: 'Erro ao buscar denúncias', error: error.message });
        }
    }

    async getDenunciaById(request, response) {
        const denunciaId = request.params.denunciaId;
        
        try {
            const denuncia = await new Denuncia().getDenunciaById(denunciaId);
            response.status(200).json(denuncia);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
}
