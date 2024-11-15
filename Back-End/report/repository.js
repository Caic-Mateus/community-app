import admin from 'firebase-admin';

export class DenunciaRepository {
    async findDenuncias() {
        return admin.firestore()
            .collection('Denuncias')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    denunciaId: doc.id
                }));
            });
    }

    async getDenunciaById(denunciaId) {
        try {
            const denunciaDoc = await admin.firestore().collection('Denuncias').doc(denunciaId).get();
            if (!denunciaDoc.exists) {
                throw new Error('Denúncia não encontrada');
            }
            return denunciaDoc.data();
        } catch (error) {
            throw new Error(`Error fetching denuncia: ${error.message}`);
        }
    }

    async saveDenunciaInFirestore(denuncia) {
        try {
            const docRef = await admin.firestore().collection('Denuncias').add({
                denunciaText: denuncia.denunciaText,
                denouncedUserName: denuncia.denouncedUserName, // Nome do usuário denunciado
                denouncerUserId: denuncia.denouncerUserId,   // ID do usuário que está fazendo a denúncia
                status: denuncia.status || 'Pendente',
                date: denuncia.date || new Date().toISOString()
            });
            return docRef.id;
        } catch (error) {
            throw new Error(`Error saving denuncia in Firestore: ${error.message}`);
        }
    }
}
