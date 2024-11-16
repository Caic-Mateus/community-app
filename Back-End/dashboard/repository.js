import admin from 'firebase-admin';

export class DashboardRepository {
    async countDocuments(collectionName) {
        try {
            const snapshot = await admin.firestore().collection(collectionName).get();
            return snapshot.size;
        } catch (error) {
            throw new Error(`Erro ao contar documentos na coleção ${collectionName}: ${error.message}`);
        }
    }
}
