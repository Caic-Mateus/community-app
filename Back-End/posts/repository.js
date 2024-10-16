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
        const postSnapshot = await admin.firestore()
            .collection('Posts')
            .where('postId', '==', postId)
            .get();
        console.log(postSnapshot)
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
                    // Buscar informações do usuário com base no userId
                    console.log('UserID:', postData.userId);
                    const userData = await this.findUserById(postData.userId);
                    console.log('UserData:', userData);
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
                return null; // Se o usuário não for encontrado
            }
        } catch (error) {
            console.error('Error fetching user:', error);
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
            throw new Error(`Error creating post: ${error.message}`);
        }
    }
}
