import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


let firebaseConfig = {
  apiKey: "AIzaSyBcS_gUF8vuq0i01IjW3jwFEkU3dvr-UsY",
    authDomain: "projetoprincipal-56944.firebaseapp.com",
    databaseURL: "https://projetoprincipal-56944-default-rtdb.firebaseio.com",
    projectId: "projetoprincipal-56944",
    storageBucket: "projetoprincipal-56944.appspot.com",
    messagingSenderId: "189237505211",
    appId: "1:189237505211:web:048c6ff7071bd26bbf0d9e",
    measurementId: "G-G7EC4DVD93"

  };
  
  if(!firebase.apps.length){
      //Abrir minha conexao
    firebase.initializeApp(firebaseConfig)
  }
  
  export default firebase;