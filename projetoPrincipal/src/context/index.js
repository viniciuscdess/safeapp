import React , { useState , createContext} from 'react';
import firebase from '../services/firebaseConection';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    async function mandar(){
        let uid = value.user.uid;
        await (await firebase.database().ref('usuarios').child(uid).once('value')
        .then((snapshot) => {
            let data = {
                uid: uid,
                nome:snapshot.val().nome
            };
            setUser(data);
        }))}
    





    const [user, setUser] = useState({});

    return(
        <AuthContext.Provider value={{ user, mandar }}> 
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;