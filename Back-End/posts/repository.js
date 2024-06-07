import admin from 'firebase-admin';

export class PostRepository{
    findMyPosts(uid){
        return admin.firestore()
                    .collection('Posts')
                    .where('UserId', '==', uid)
                    .get()
                    .then(snapshot => {
                        return snapshot.docs.map(doc => ({
                            ...doc.data(),
                            uid: doc.id
                        }))
                        
                    })
    }
}