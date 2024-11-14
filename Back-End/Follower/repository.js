import admin from 'firebase-admin';

export class FollowersRepository {
    static async followUser(userId, followerId) {
        const db = admin.firestore();
        const docRef = db.collection('Followers').doc(userId).collection('userFollowers').doc(followerId);
        await docRef.set({ followedAt: admin.firestore.Timestamp.now() });
        return docRef.id;
    }

    static async unfollowUser(userId, followerId) {
        const db = admin.firestore();
        const docRef = db.collection('Followers').doc(userId).collection('userFollowers').doc(followerId);
        await docRef.delete();
    }

    static async getFollowers(userId) {
        const db = admin.firestore();
        const snapshot = await db.collection('Followers').doc(userId).collection('userFollowers').get();
        return snapshot.docs.map(doc => ({ followerId: doc.id, ...doc.data() }));
    }

    static async getFollowing(followerId) {
        const db = admin.firestore();
        const snapshot = await db.collectionGroup('userFollowers').where(admin.firestore.FieldPath.documentId(), '==', followerId).get();
        return snapshot.docs.map(doc => ({ userId: doc.ref.parent.parent.id, ...doc.data() }));
    }
}
