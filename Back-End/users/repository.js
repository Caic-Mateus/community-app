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
