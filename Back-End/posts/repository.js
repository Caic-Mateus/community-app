import admin from 'firebase-admin';

export class PostRepository {
    async findMyPosts(uid) {
        return admin.firestore()
            .collection('Posts')
            .where('userId', '==', uid)
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            });
    }
    async findPostsByPostId(postId) {
        return admin.firestore()
            .collection('Posts')
            .where('postId', '==', postId)
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            });
    }
    async createPost(postData) {
        try {
            const docRef = await admin.firestore().collection('Posts').doc(); // Gera o ID automaticamente
            postData.postId = docRef.id; // Define o postId com o ID do documento
            await docRef.set(postData); // Define os dados do post no documento criado
            return docRef.id; // Retorna o ID do documento criado
        } catch (error) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    }
}
