import admin from 'firebase-admin';

export class PostRepository {
    // Buscar posts de um usuário específico
    async findPostsByUserId(userId) {
        try {
            const snapshot = await admin.firestore()
                .collection('Posts')
                .where('userId', '==', userId)
                .get();

            return snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
        } catch (error) {
            console.error('Erro ao buscar posts do usuário:', error);
            throw error;
        }
    }

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
        const postSnapshot = await admin.firestore()
            .collection('Posts')
            .where('postId', '==', postId)
            .get();

        const postsWithUserData = await Promise.all(postSnapshot.docs.map(async postDoc => {
            const post = postDoc.data();
            const userSnapshot = await admin.firestore()
                .collection('Users')
                .doc(post.userId)
                .get();

            const userData = userSnapshot.data();
            return {
                ...post,
                user: userData,
                uid: postDoc.id
            };
        }));

        return postsWithUserData;
    }

    async findPosts() {
        const posts = await admin.firestore()
            .collection('Posts')
            .orderBy('registrationDate', 'desc')
            .get()
            .then(async snapshot => {
                const postsData = [];
                for (const doc of snapshot.docs) {
                    const postData = { ...doc.data(), uid: doc.id };
                    const userData = await this.findUserById(postData.userId);
                    postData.user = userData; // Adicionar dados do usuário ao objeto de postagem
                    postsData.push(postData);
                }
                return postsData;
            });
        return posts;
    }

    async findUserById(userId) {
        try {
            const userDoc = await admin.firestore().collection('Users').doc(userId).get();
            if (userDoc.exists) {
                return { ...userDoc.data(), uid: userDoc.id };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }

    async createPost(postData) {
        try {
            const docRef = await admin.firestore().collection('Posts').doc(); // Gera o ID automaticamente
            postData.postId = docRef.id; // Define o postId com o ID do documento
            await docRef.set(postData); // Define os dados do post no documento criado
            return docRef.id; // Retorna o ID do documento criado
        } catch (error) {
            throw new Error(`Erro ao criar post: ${error.message}`);
        }
    }

// repository.js
async savePost(userId, postId) {
    try {
        // Verifica duplicidade e salva o post
        const snapshot = await admin.firestore()
            .collection('PostsSaves')
            .where('userId', '==', userId)
            .where('postId', '==', postId)
            .get();

        if (!snapshot.empty) {
            snapshot.forEach(async (doc) => {
                await doc.ref.delete();
            });
            throw new Error('Este post já foi salvo.');
        }

        // Adiciona o post salvo no Firestore
        await admin.firestore().collection('PostsSaves').add({
            userId: userId,
            postId: postId,
            savedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error('Erro ao salvar post na repository:', error);
        throw error;
    }
}




}
