import admin from 'firebase-admin';

export class FollowersRepository {
    static async followUser(userId, followerId) {
        const db = admin.firestore();
        const docRef = db.collection('Followers').doc(userId).collection('userFollowers').doc(followerId);
        try {
            await docRef.set({ followedAt: admin.firestore.Timestamp.now() });
            return docRef.id; // Retorna o ID do documento como resultado
        } catch (error) {
            console.error('Erro ao seguir usuário:', error);
            throw error;
        }
    }

    static async unfollowUser(userId, followerId) {
        const db = admin.firestore();
        const docRef = db.collection('Followers').doc(userId).collection('userFollowers').doc(followerId);
        try {
            await docRef.delete();
        } catch (error) {
            console.error('Erro ao deixar de seguir usuário:', error);
            throw error;
        }
    }

    static async getFollowers(userId) {
        const db = admin.firestore();
        try {
            const snapshot = await db.collection('Followers').doc(userId).collection('userFollowers').get();
            return snapshot.docs.map(doc => ({ followerId: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Erro ao buscar seguidores:', error);
            throw error;
        }
    }

    static async getFollowing(followerId) {
        const db = admin.firestore();
        try {
            const snapshot = await db.collectionGroup('userFollowers').where(admin.firestore.FieldPath.documentId(), '==', followerId).get();
            return snapshot.docs.map(doc => ({ userId: doc.ref.parent.parent.id, ...doc.data() }));
        } catch (error) {
            console.error('Erro ao buscar seguidos:', error);
            throw error;
        }
    }
}
