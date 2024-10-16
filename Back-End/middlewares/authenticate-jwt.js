import admin from 'firebase-admin';

export async function autheticateToken(request, response, next){
    console.log('chamou middleware')
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
    request.user = {
        uid : decodedIdToken.sub
    }

    next();
}