import firebase from 'firebase/compat/app';
import {auth} from '../../FirebaseConfig'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default class AuthService{
    login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                localStorage.setItem('token', userCredential.user.accessToken); // Salvando o token no localStorage
                localStorage.setItem('uid', userCredential.user.uid); 
                console.log(userCredential.user)
                return userCredential.user;
    })
    .catch(error => {
        console.log('Login error', error)
        return Promisse.reject(error);
    })
    }
    logout() {
        return auth.signOut()
            .then(() => {
                localStorage.removeItem('token'); // Removendo o token do localStorage
                console.log('User logged out successfully');
            })
            .catch(error => {
                console.log('Logout error', error);
                return Promise.reject(error);
            });
    }
    recoverPassword(email){
        return sendPasswordResetEmail(auth, email)
        .then( () => {
            console.log('Password reset email sent');
        })
        .catch(error => {
            console.error('Error sending password reset email: ', error);
            return Promise.reject(error)
        })
    }
}