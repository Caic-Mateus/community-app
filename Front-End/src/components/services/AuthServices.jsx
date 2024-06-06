import {auth} from '../../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default class AuthService{
    login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log('Logged in user: ', userCredential.user)
                console.log(userCredential)
                return userCredential.user;
    })
    .catch(error => {
        console.log('Login error', error)
        return Promisse.reject(error);
    })
    }
}