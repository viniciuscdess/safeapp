import React,{useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localeData } from 'moment';

export const AuthContext = createContext({});


 function AuthProvider({children}) {
    const [user , setUser] = useState(null);
    //quando abrir a aplicaçao
    const [loading , setLoading] = useState(true);
    //quando clicar acessar e der then(logar ou cadastrar)
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        async function loadStorage(){
          const storageUser = await AsyncStorage.getItem('safeApp');
          if(storageUser){
            setUser(JSON.parse(storageUser));
            setLoading(false);
          }
          setLoading(false);
        }
        loadStorage();
      }, [])

    async function signIn(email, password){
        setLoadingAuth(true);

        await auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            //Buscar o nome do usario logado
            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            console.log(userProfile.data().nome);

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    async function signUp(email, password, name){
        setLoadingAuth(true);

        await auth().createUserWithEmailAndPassword(email, password)
        //se ele criou a conta dentro desse value é possivel acessar o email do usario , uid etc...
        .then(async (value) => {
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                nome: name
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    async function storageUser(data){
        //JSON.stringify transforma o data em string
        await AsyncStorage.setItem('safeApp' , JSON.stringify(data));
    }

 return (
     //!! ele olha dentro de de user e se nao tiver nada (ngm logad) ele le como falso se tiver algo dentro le como true
     //signUp metodo para criar conta(cadastro)
   <AuthContext.Provider value={{signed: !!user, user, signUp, signIn, loadingAuth, loading}}>
       {children}
   </AuthContext.Provider>
  );
}

export default AuthProvider;