import React from 'react';
import './login.css'


//import { initializeApp } from "firebase/app";
//import { collection, getDocs, getFirestore } from "firebase/firestore";
//
//
//const firebaseApp = initializeApp({
//  apiKey: "AIzaSyCsnas8GvFGdRSowd9cO_FTjqWFXq4NL5c",
//  authDomain: "commu-unity.firebaseapp.com",
//  projectId: "commu-unity",
//  storageBucket: "commu-unity.appspot.com",
//  messagingSenderId: "902570290287",
//  appId: "1:902570290287:web:8742495b0bd4c63f50f19a",
//  measurementId: "G-KE41MJQT9E"
//});
//
//export const App = () => {
//
//  const [email, setEmail] = useState("");
//  const [nome, setNome] = useState("");
//  const [senha, setSenha] = useState("");
//  const [usuarios, setUsuarios] = useState([]);
//
//  const db = getFirestore(firebaseApp);
//  const userCollectionRef = collection(db, "usuarios", collection)
//
//  useEffect(() => {
//    const getUsuarios = async () => {
//      const data = await getDocs(userCollectionRef);
//      console.log(data);
//    };
//    getUsuarios();
//  }, []);
//};


function LoginForm() {
  return (
    <div className="login-container">
      <div className='quadrado'>

      
    <button className="google-login-button" /*onClick={handleGoogleLogin}*/>
        <img src="../../public/img/google-37.png" alt="Google Logo" className="google-logo" />
        <span>Fazer login com o Google</span>
    </button>
    <form action="#">
        <input type="text" className="input-field" placeholder="Username" required />
        <input type="password" className="input-field" placeholder="Password" required />
        <input type="submit" className="input-field submit-button" value="Avançar" />
    </form>
    <div className="signup-text">
    Não tem uma conta? <a href="#">Inscreva-se</a>
    </div>
    </div>
    </div>

  );
}

export default LoginForm;
