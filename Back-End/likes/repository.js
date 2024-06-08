import admin from 'firebase-admin';

export class LikeRepository {
    async checkLikeExists(userId, postId) {
        const likesSnapshot = await admin.firestore()
            .collection('Likes')
            .where('userId', '==', userId)
            .where('postId', '==', postId)
            .get();

        if (!likesSnapshot.empty) {
            return likesSnapshot.docs[0].id; // Retorna o ID do documento do like
        } else {
            return false;
        }
    }

    async createLike(likeData) {
        try {
            await admin.firestore().collection('Likes').add(likeData);
        } catch (error) {
            throw new Error(`Error creating like: ${error.message}`);
        }
    }

    async deleteLike(likeDocId) {
        try {
            await admin.firestore().collection('Likes').doc(likeDocId).delete();
        } catch (error) {
            throw new Error(`Error deleting like: ${error.message}`);
        }
    }

    async incrementPostLikes(postId) {
        const postRef = admin.firestore().collection('Posts').doc(postId);
        return admin.firestore().runTransaction(async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists) {
                throw new Error('Post não encontrado.');
            }

            const newCountLikes = (postDoc.data().likesCount || 0) + 1;
            transaction.update(postRef, { likesCount: newCountLikes });
        });
    }

    async decrementPostLikes(postId) {
        const postRef = admin.firestore().collection('Posts').doc(postId);
        return admin.firestore().runTransaction(async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists) {
                throw new Error('Post não encontrado.');
            }

            const newCountLikes = Math.max((postDoc.data().likesCount || 0) - 1, 0);
            transaction.update(postRef, { likesCount: newCountLikes });
        });
    }
}
