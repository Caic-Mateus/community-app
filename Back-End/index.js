import express from 'express';
import admin from 'firebase-admin'

const app = express();

admin.initializeApp({
    credential: admin.credential.cert("database.json")
})
app.get("/users", (request,response) =>{
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

app.listen(3000,() => console.log('Aplicação iniciada.'))