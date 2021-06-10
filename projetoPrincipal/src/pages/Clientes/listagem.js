import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import EditarCliente from './editarCliente';
import PaginaClientes from './paginaClientes';
import Cadastro from './cadastro';

import AdicionarLembrete from '../Lembretes/adicionarLembrete';
import EditarLembrete from '../Lembretes/editarLembrete';
import PaginaLembretes from '../Lembretes/paginaLembretes';

export default function Listagem({ data, userId}) {

  const navigation = useNavigation();
  const [newDate, setNewDate] = useState( new Date());

  var hojeMaior = format(newDate, 'dd-MM-yyyy');


  function ver(data) {
    navigation.navigate('EditarCliente', {key: data.key, nome:data.nome, dataNascimento: data.dataNascimento, cpf: data.cpf, matricula: data.matricula, senha: data.senha, convenio:data.convenio, endereço:data.endereço, telefone: data.telefone, comentario:data.comentario, estadoCivil: data.estadoCivil, userId: userId, id: data.id })
  }

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

  const docId = data.id;
  
  async function excluir(){
    await firestore().collection('clientes').doc(docId).delete()
    .then(() => {
      console.log('edita com sucesso');
      alert('Cliente excluido com sucesso')
      
    })
    
  }

  return (
    <TouchableWithoutFeedback onLongPress={handleDelete}> 
      <View style={styles.container}>
        <View style={styles.componente}>

          <View style={styles.viewLetra}>
            <Text style={styles.letra}>{data.nome.slice(0,1)}</Text>
          </View>

          <View  style={styles.areaTexto}>
            <Text style={styles.texto}>{data.nome}</Text>
            <Text style={styles.textoTelefone2}>{data.telefone} </Text>
          </View>

          <View style={styles.viewBotaoVer}>
            <TouchableOpacity onPress={() => ver(data)} style={styles.botaoVer}>
                  <Icon name="chevron-right" color="#000" size={30} />
            </TouchableOpacity>

            
          </View>

          <TouchableOpacity  style={styles.botaoVer}>
                  <Text style={{color:'#000' , fontSize:30}}>excluir</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    marginBottom:5
  },
  componente:{ 
    flexDirection:'row',
    borderBottomWidth:1,
    width:'100%',
    marginBottom:5,
    padding:5,
    alignItems:'center'
  },
  areaTexto:{
    backgroundColor:'#fff',
    paddingBottom:5,
    width:'77%'
  },
  texto:{
    fontSize:18,
    fontWeight:'bold',
    color:'#333333',
  },
  viewBotaoVer:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    
  },
  botaoVer:{
    marginRight:50
  },
  areaTextoTelefone:{
    backgroundColor:'#fff',  
    borderBottomWidth:1,
    flexDirection:'row'
  },
  textoTelefone:{
    fontSize:12,
    color:'#000',
   
    fontWeight:'bold'
  },
  textoTelefone2:{
    fontSize:14,
    color:'#000',
    
  },
  botao:{
    padding:5,
    borderRadius:9,
    marginBottom:2,
  },
  botaoTexto:{
    fontWeight:'bold',
    color:'#fff'
  },
  containerLista:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  viewLetra:{
    backgroundColor:'#82E0AA',
    width:'14%',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    margin:4,
    height:55
  },
  letra:{
    fontSize:30,
    color:'#000',
    padding:2,
    fontWeight:'bold'
  }
});