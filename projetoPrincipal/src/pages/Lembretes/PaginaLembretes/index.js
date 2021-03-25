import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, StatusBar, FlatList, TextInput, ActivityIndicator, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';

import firebase from '../../../services/firebaseConection';
import AdicionarLembrete from '../AdicionarLembrete';
import ListagemLembrete from '../ListagemLembrete';
import Listagem from '../../Clientes/ListagemClientes/index';



export default function ListNotes() {
  const navigation        = useNavigation();  
  const [notes, setNotes] = useState([]);
  const [client, setClient] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [loading, setLoading] = useState(true);

  const [lembrete, setLembrete] = useState([]);
  var j = 0;


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
      //alert("Você tem :" + client.length + " notas!!");
  }, []);

    
 //busca as notas
  useEffect( () => {          
      async function dados() {             
          await firebase.database().ref('lembretes').on('value', (snapshot)=> {
            setLembrete([]);
              snapshot.forEach( (childItem) => {             
                  let data = {                        
                      key: childItem.key,
                   //   nome: retornaNome(childItem.key,childItem.val().idcliente,childItem.val().note),
                      nome: retornaNome(childItem.val().idCliente),
                      lembrete: childItem.val().lembrete                         
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
<ScrollView showsVerticalScrollIndicator={false}>
  <View style={styles.container}>

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
          <FlatList
            keyExtractor={item => item.key}
            data={lembrete}            
            renderItem={ ({item}) => <ListagemLembrete data={item}  deleteItem={handleDelete} />  }   
          />
        )
        }

  </View>
 </ScrollView> 
);
} 
const styles = StyleSheet.create({
container:{
  backgroundColor:'#fff',
},
header:{
  backgroundColor:'#16A085',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  paddingTop: 0 + getStatusBarHeight(),
},
textoHeader:{
  fontSize:40,
  fontWeight:'bold',
  color:'#fff',
  justifyContent:'center',
  
},

})