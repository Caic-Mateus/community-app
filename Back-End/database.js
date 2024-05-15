

import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyCsnas8GvFGdRSowd9cO_FTjqWFXq4NL5c",
  authDomain: "commu-unity.firebaseapp.com",
  projectId: "commu-unity",
  storageBucket: "commu-unity.appspot.com",
  messagingSenderId: "902570290287",
  appId: "1:902570290287:web:8742495b0bd4c63f50f19a",
  measurementId: "G-KE41MJQT9E"
});

export const App = () => {

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "usuarios", collection)

  useEffect(() => {
    const getUsuarios = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);
    };
    getUsuarios();
  }, []);
};