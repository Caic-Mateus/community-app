// repository.js
import admin from 'firebase-admin';

export class BugRepository {
    async findBugs() {
        return admin.firestore()
            .collection('Bugs')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    bugId: doc.id
                }));
            });
    }

    async getBugById(bugId) {
        try {
            const bugDoc = await admin.firestore().collection('Bugs').doc(bugId).get();
            if (!bugDoc.exists) {
                throw new Error('Bug não encontrado');
            }
            return bugDoc.data();
        } catch (error) {
            throw new Error(`Error fetching bug: ${error.message}`);
        }
    }

    async saveBugInFirestore(bug) {
        try {
            const docRef = await admin.firestore().collection('Bugs').add({
                bugDescription: bug.bugDescription,
                reporterUserId: bug.reporterUserId // ID do usuário que está reportando o bug
            });
            return docRef.id;
        } catch (error) {
            throw new Error(`Error saving bug in Firestore: ${error.message}`);
        }
    }
}
