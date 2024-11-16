import admin from 'firebase-admin';

export async function autheticateToken(request, response, next){
    console.log('chamou middleware')
    const jwt = request.headers.authorization;
    if(!jwt){
        return response.status(401).json({message: "Usuário não autorizado!"});
        
    }
    let decodedIdToken
    try{
        decodedIdToken = await admin.auth().verifyIdToken(jwt);
    }
    catch(e){
        return response.status(401).json({message: "Token inválido!"});
        
    }
    request.user = {
        uid : decodedIdToken.sub
    }

    next();
}