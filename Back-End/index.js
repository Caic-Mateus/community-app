import express from 'express';
import admin from 'firebase-admin'
import { autheticateToken } from './middlewares/authenticate-jwt.js';
import { PostController } from './posts/postController.js';

const app = express();

const postController = new PostController();

admin.initializeApp({
    credential: admin.credential.cert("database.json")
})
app.get("/users", async (request,response) =>{
    const jwt = request.headers.authorization;
    if(!jwt){
        response.status(401).json({message: "Usuário não autorizado!"});
        return;
    }
    let decodedIdToken
    try{
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    }
    catch(e){
        response.status(401).json({message: "Token inválido!"});
        return;
    }
    console.log('GET');
    admin.firestore()
    .collection('Users')
    .get()
    .then(snapshot => {
        const users = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }))
        response.json(users)
    })
    
})

app.get("/myposts", autheticateToken, postController.findPostsById)

app.listen(3000,() => console.log('Aplicação iniciada.'))