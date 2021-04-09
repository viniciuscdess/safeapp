import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text ,ScrollView, StatusBar, FlatList, TextInput, ActivityIndicator, Alert, SafeAreaView  } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import { format } from 'date-fns';

import firebase from '../../services/firebaseConection';

import Cadastro from '../Clientes/cadastro';
import EditarCliente from '../Clientes/editarCliente';
import PaginaClientes from '../Clientes/paginaClientes';

import EditarLembrete from './editarLembrete';
import Listagem from './listagem';
import AdicionarLembrete from './adicionarLembrete';



export default function PaginaLembretes() {

  const navigation = useNavigation();  
  const [client, setClient] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lembrete, setLembrete] = useState([]);
  var j = 0;
  const newDate = new Date();
  const hoje = format(newDate , 'dd-MM-yyyy')

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

  
  function retornaNome(idCliente){   
         
      for(var i=0; i < client.length; i++) {
          if(client[i].key === idCliente) {
              if (j === 0){
                  j++;
              }
            // let nomes =  client[i].name;
              return client[i].name;
          } 
      } 
  }  

  async function handleDelete(key, data){
    //await firebase.database().ref('clientes').child(key).remove();
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
        onPress:() => handleDeleteSucess(key)
      }
      ]
    )
  }

  async function handleDeleteSucess(key) {
    await firebase.database().ref('lembretes').child(key).remove();
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

     
      {loading2 ? 
        (
            <ActivityIndicator color='#121212' size={45} />
        ):
        (
        
        <View style={{backgroundColor:'#fff'}}> 
          <FlatList
            keyExtractor={item => item.key}
            data={lembrete}            
            renderItem={ ({item}) => <Listagem data={item}  deleteItem={handleDelete} />  }   
          />
        </View>
     
          
       
        )
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