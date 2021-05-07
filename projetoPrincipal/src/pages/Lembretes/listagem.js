import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
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

  

  async function excluir(){
    await firestore().collection('lembretes').doc(docId).delete()
    .then(() => {
      console.log('edita com sucesso');
      alert('foi')
      
    })
  }

  

return (
  <TouchableWithoutFeedback onLongPress={deleteItem(docId)}> 
    <View style={styles.container}>

        <View style={styles.componente}>
            <View  style={styles.areaTexto}>
              <Text style={styles.texto}>{data.lembrete}</Text>
              
              <View style={styles.areaTextoNome}>
                  <Text style={styles.textoNome}>{data.nomeCliente}</Text>     
              </View>

            
          </View>

          <View style={styles.viewBotaoVer}>
            <TouchableOpacity onPress={() => ver(data)}>
                    <Icon name="chevron-right" color="#000" size={30}/>
            </TouchableOpacity>  

            <TouchableOpacity onPress={excluir}>
                    <Text>Excluir</Text>
            </TouchableOpacity>  
          </View>


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