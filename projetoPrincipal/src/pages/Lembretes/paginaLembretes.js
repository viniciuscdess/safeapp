import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Button, Text ,ScrollView, StatusBar, FlatList, TextInput, ActivityIndicator, Alert, SafeAreaView  } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import { format } from 'date-fns';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../contexts/auth';

import Cadastro from '../Clientes/cadastro';
import EditarCliente from '../Clientes/editarCliente';
import PaginaClientes from '../Clientes/paginaClientes';

import EditarLembrete from './editarLembrete';
import Listagem from './listagem';
import AdicionarLembrete from './adicionarLembrete';

export default function PaginaLembretes() {
 var j = 0;
  const navigation = useNavigation();  
  const [client, setClient] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lembrete, setLembrete] = useState([]);
   

  const {user} = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);

 
 
  useEffect(() => {
    const subscriber = firestore()
    .collection('clientes')
    .onSnapshot( snapshot => {
      const clienteList = [];
      snapshot.forEach(doc => {
        clienteList.push({
          ...doc.data(),
          //pega o id do cliente e nao do usario que esta logado
          id: doc.id,
        });
      });
      setClientes(clienteList);
      setLoading(false);
    })
    return () => subscriber();
  }, [clientes])

  useEffect(() => {
    const subscriber = firestore()
    .collection('lembretes')
    .orderBy('dataLembrete' , 'asc')
    .onSnapshot( snapshot => {
      const lembreteList = [];
      snapshot.forEach(doc => {
        lembreteList.push({
          //pega o id do cliente e nao do usario que esta logado
          id: doc.id,
          nomeCliente: retornaNome(doc.id),
          ...doc.data(), 
          
        });
      });
      setLembrete(lembreteList);
      setLoading(false);
    })
    return () => subscriber();
  }, [lembrete]); 


  function retornidcliente(idLembrete){
    for(var i=0; i < lembrete.length; i++) {
     // alert(clientes[i].id + " - " + idCliente);
        if(lembrete[i].id === idLembrete) {
          
          // let nomes =  client[i].name;
           //alert("testes " + lembrete[i].idCliente);
            return lembrete[i].idCliente;
        }  
    } 
  }
  
  function retornaNome(idLembrete){   
    let idCliente = retornidcliente(idLembrete);
      for(var i=0; i < clientes.length; i++) {
      //  alert(clientes[i].id + " - " + idCliente);
          if(clientes[i].id === idCliente) {
            
            // let nomes =  client[i].name;
            //alert("testes " + clientes[i].nome);
              return clientes[i].nome;
          }  
      } 
  } 


  async function handleDelete(key, data, id){
    await firestore().collection('lembretes').doc(id).delete();
    Alert.alert(
      'Cuidado Atenção!',
      `Você realmente deseja excluir esse Lembrete??`,
      [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text:'Excluir',
        onPress:() => handleDeleteSucess(id)
      }
      ]
    )
  }

  async function handleDeleteSucess(){
    await firestore().collection('lembretes').doc(id).delete()
    .then(() => {
      console.log('edita com sucesso');
      alert('foi')
      
    })
  }


return (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
 
      <StatusBar
          backgroundColor='transparent'
          barStyle='dark-content'
          translucent={true}
        />
      
      <View style={styles.header}>
        <Text style={styles.textoHeader}> Lembretes</Text>
      </View>

     
      {loading ? (
        <ActivityIndicator size={20} color='#000'/>
      ) 
    :
      <View style={{backgroundColor:'#fff'}}> 
          <FlatList
          keyExtractor={item => item.key}
          data={lembrete}            
          renderItem={ ({item}) => <Listagem data={item}  deleteItem={handleDelete}  userId={user.uid}/> }   
        />
      </View>
    
    }
        
      


    </ScrollView> 
 </SafeAreaView>
);
} 
const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#fff',
},
header:{
  backgroundColor:'#16A085',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  paddingTop: 0 + getStatusBarHeight(),
},
viewData:{
  alignItems:'center',
  margin:10,
  flexDirection:'row',
  justifyContent:'center',
  borderBottomWidth:1,
  borderColor:'#16A085'
},
textoData:{
  fontSize:28,
  fontWeight:'bold',
  color:'#000'
},  
textoHeader:{
  fontSize:40,
  fontWeight:'bold',
  color:'#fff',
  justifyContent:'center',
  
},

})



/*
 //busca os clientes 
 useEffect( () => {      
      async function dados2() {            
          await firebase.database().ref('clientes').on('value', (snapshot)=> {
              setClient([]);
              snapshot.forEach( (childItem) => {            
                  //retornaNome(childItem.key);
                  let data2 = {                        
                      key: childItem.key,
                      name: childItem.val().nome , 
                  };
                  setClient(oldArray => [...oldArray, data2]);
              })
              setLoading2(false);
          })
      }    
      dados2();
  }, []);
*/


/*
  useEffect( () => {
      async function dados() {             
          await firebase.database().ref('lembretes').startAt(hoje).orderByChild('date').on('value', (snapshot)=> {
            setLembrete([]);
              snapshot.forEach( (childItem) => {  
                  let data = {                        
                      key: childItem.key,
                      nome: retornaNome(childItem.val().idCliente),
                      lembrete: childItem.val().lembrete,
                      date: childItem.val().date,                         
                  }; 
                   
                  setLembrete(oldArray => [...oldArray, data]);
              })
              setLoading(false);
          }) 
      }    
      dados();
  }, [client]); 
*/