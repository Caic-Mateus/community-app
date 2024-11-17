import admin from 'firebase-admin';

export class FollowerRepository {
    // Verifica se a relação de "seguir" já existe
    async checkFollowExists(userId, targetUserId) {
        const followSnapshot = await admin.firestore()
            .collection('Followers')
            .where('userId', '==', userId)
            .where('targetUserId', '==', targetUserId)
            .get();

        if (!followSnapshot.empty) {
            return followSnapshot.docs[0].id; // Retorna o ID do documento
        } else {
            return false;
        }
    }

    // Cria uma nova relação de "seguir"
    async createFollow(followData) {
        try {
            await admin.firestore().collection('Followers').add(followData);
        } catch (error) {
            throw new Error(`Error creating follow: ${error.message}`);
        }
    }

    // Remove a relação de "seguir"
    async deleteFollow(followDocId) {
        try {
            await admin.firestore().collection('Followers').doc(followDocId).delete();
        } catch (error) {
            throw new Error(`Error deleting follow: ${error.message}`);
        }
    }

    async countFollowers(targetUserId) {
        try {
          const snapshot = await admin
            .firestore()
            .collection('Followers')
            .where('targetUserId', '==', targetUserId)
            .get();
          return snapshot.size; // Número de seguidores
        } catch (error) {
          console.error('Erro ao contar seguidores:', error);
          throw new Error('Erro ao contar seguidores.');
        }
      }
    
      async countFollowing(userId) {
        try {
          const snapshot = await admin
            .firestore()
            .collection('Followers')
            .where('userId', '==', userId)
            .get();
          return snapshot.size; // Número de pessoas que o usuário segue
        } catch (error) {
          console.error('Erro ao contar seguidos:', error);
          throw new Error('Erro ao contar seguidos.');
        }
      }

      async checkIfFollowing(userId, targetUserId) {
        const snapshot = await admin.firestore()
            .collection('Followers')
            .where('userId', '==', userId)
            .where('targetUserId', '==', targetUserId)
            .get();

        return !snapshot.empty; // Se não estiver vazio, existe a relação de seguir
    }
}
