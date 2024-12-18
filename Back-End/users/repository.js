import admin from 'firebase-admin';

export class UserRepository {
    async findUsers() {
        return admin.firestore()
            .collection('Users')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            });
    }
    async updateUser(userId, userData) {
        try {
            const userRef = admin.firestore().collection("Users").doc(userId);
    
            // Verifica se o usuário existe
            const userDoc = await userRef.get();
            if (!userDoc.exists) {
                throw new Error("Usuário não encontrado");
            }
    
            // Atualiza os dados do usuário
            await userRef.update(userData);
    
            // Retorna os dados atualizados
            const updatedUser = await userRef.get();
            return updatedUser.data();
        } catch (error) {
            throw new Error(`Erro ao atualizar o usuário: ${error.message}`);
        }
    }
    
    async countUsers() {
        try {
            const snapshot = await admin.firestore().collection('Users').get();
            return snapshot.size; // Retorna o número de documentos na coleção
        } catch (error) {
            throw new Error(`Erro ao contar os usuários: ${error.message}`);
        }
    }
    
    async findUsersByName(name) {
        return admin.firestore()
            .collection('Users')
            .where('name', '>=', name) // Buscando usuários cujos nomes começam com o valor dado
            .where('name', '<=', name + '\uf8ff') // Para capturar usuários com nomes próximos lexicograficamente
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    throw new Error('Nenhum usuário encontrado');
                }
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            })
            .catch(error => {
                throw new Error(`Error fetching users by name: ${error.message}`);
            });
    }

    async createUserInAuth(email, password) {
        try {
            const userRecord = await admin.auth().createUser({
                email: email,
                password: password
            });
            return userRecord;
        } catch (error) {
            throw new Error(`Error creating user in auth: ${error.message}`);
        }
    }
    async getUserById(userId) {
        try {
            const userDoc = await admin.firestore().collection('Users').doc(userId).get();
            if (!userDoc.exists) {
                throw new Error('User not found');
            }
            return userDoc.data();
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }
    async saveUserInFirestore(user) {
        try {
            await admin.firestore().collection('Users').doc(user.userId).set({
                email: user.email,
                name: user.name,
                avatarUrl: user.avatarUrl,
                curso: user.curso,
                date_Nasc: user.date_Nasc,
                registrationDate: user.registrationDate,
                telefone: user.telefone,
                user: user.user,
                userId: user.userId
            });
        } catch (error) {
            throw new Error(`Error saving user in Firestore: ${error.message}`);
        }
    }
}
