import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, TouchableWithoutFeedback, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import firestore from '@react-native-firebase/firestore';

import Cadastro from '../Clientes/cadastro';
import EditarCliente from '../Clientes/editarCliente';
import PaginaClientes from '../Clientes/paginaClientes';

import EditarLembrete from './editarLembrete';
import AdicionarLembrete from './adicionarLembrete';
import PaginaLembretes from './paginaLembretes';

export default function Listagem({ data, deleteItem }) {
  const navigation = useNavigation();
    
   function ver(data){
    navigation.navigate('EditarLembrete', {id:data.id,lembrete:data.lembrete});
  }

  const docId = data.id;

  async function handleDelete(key, data, id){
   
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
        onPress:() => excluir(docId)
      }
      ]
    )
  }

  async function excluir(){
    await firestore().collection('lembretes').doc(docId).delete()
    .then(() => {
      console.log('edita com sucesso');
      alert('Lembrete excluido com sucesso')
      
    })
  }

function chamaHoje(){
  let date1 = new Date();
  let day = date1.getDay();
  let month = date1.getUTCMonth();
  let year = '21';
  let hoje = "06" + "/" + "09" + "/" + year;
  return hoje;
}

 function converterData(dataTimeStamp){
  let hojee =  chamaHoje() ;
  let d     = new Date(dataTimeStamp._seconds * 1000).toLocaleDateString('en-GB' );
  //return new Date(dataTimeStamp._seconds * 1000).toLocaleDateString('en-GB', { timeZone: 'GMT-3' });

 
  // if(d.toString() === hojee.toString()){
  //   return "Eh hoje " + d;
  // }else{
  //   return d + "//" + hojee;
  // }

 if(d.toString() === hojee.toString()){
    return true;
  } 

 }
  

return (
  <TouchableWithoutFeedback onLongPress={handleDelete}> 
  
    <View style={styles.container}>
     
        <View style={styles.componente}>    
        {converterData(data.dataLembrete) ? 
        <View>    
            <View  style={styles.areaTexto}>
              <Text style={styles.texto}>{data.lembrete}</Text>
              <Text style={styles.texto}>{converterData(data.dataLembrete)}</Text>
              <View style={styles.areaTextoNome}>
                  <Text style={styles.textoNome}>{data.nomeCliente}</Text>     
              </View>            
            </View> 
            <View style={styles.viewBotaoVer}>
            <TouchableOpacity onPress={() => ver(data)}>
                    <Icon name="chevron-right" color="#000" size={30}/>
            </TouchableOpacity>  
          </View>
         </View>   
            :
  <View><Text> - </Text></View> 
      
}
         

          
        </View> 
     
     
    </View>  
     
    
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  componente:{
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    borderBottomWidth:1,
  },
  areaTexto:{
    backgroundColor:'#fff',
    height:55,
    width:350,
    padding:5,
    margin:5
  },
  texto:{
    fontSize:18,
    fontWeight:'bold',
    color:'#333333',
    paddingLeft:5
  },
  areaTextoNome:{
    width:'100%'
  },
  textoNome:{
    fontSize:14,
    color:'#000',
    paddingLeft:5
  },
});