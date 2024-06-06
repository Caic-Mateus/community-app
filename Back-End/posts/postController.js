import admin from 'firebase-admin';

export class PostController{
    findPostsById = (request,response) =>{
        console.log('chamou api')
        
        console.log('GET');
        admin.firestore()
        .collection('Posts')
        .where('user.uid', '==', request.user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            const posts = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            response.json(posts)
        })
        
    }
}