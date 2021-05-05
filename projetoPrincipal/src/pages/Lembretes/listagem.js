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

  function ver(){
    navigation.navigate('EditarLembrete', {key:data.key,lembrete:data.lembrete})
  }

return (
  <TouchableWithoutFeedback onLongPress={() => deleteItem(data.key)}> 
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
 
  },
  areaTextoNome:{
    width:'100%'
  },
  textoNome:{
    fontSize:14,
    color:'#000',
  },
});