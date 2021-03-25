import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';


export default function Listagem({ data, deleteItem}) {

  const navigation = useNavigation('Editar');

  function ver(data) {
    navigation.navigate('Editar', {key: data.key, nome:data.nome, dataNascimento: data.dataNascimento, cpf: data.cpf, matricula: data.matricula, senha: data.senha, convenio:data.convenio, endereço:data.endereço, telefone: data.telefone, comentario:data.comentario, estadoCivil: data.estadoCivil})
  }

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data.key)}> 
      <View style={styles.container}>

        <View style={styles.componente}>
          <View  style={styles.areaTexto}>
            <Text style={styles.texto}>{data.nome}</Text>

            <View style={styles.viewBotaoVer}>
              <TouchableOpacity onPress={() => ver(data)} style={styles.botaoVer}>
                <Icon name="arrow-right" color="#000" size={30}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.areaTextoTelefone} >
            <Text style={styles.textoTelefone}> Telefone: </Text> 
            <Text style={styles.textoTelefone2}>  {data.telefone} </Text>
            
             
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
    alignItems:'center',
    marginTop:10,
  },
  componente:{
    width:'100%',
  },
  areaTexto:{
    backgroundColor:'#fff',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingLeft:5,
    paddingRight:5,
    paddingTop:2
  },
  texto:{
    fontSize:28,
    fontWeight:'bold',
    color:'#333333',
  },
  viewBotaoVer:{
    justifyContent:'center'
  },
  areaTextoTelefone:{
    backgroundColor:'#fff',
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:5,
    paddingTop:2,
    borderBottomWidth:1
  },

  textoTelefone:{
    fontSize:17,
    color:'#000',
    paddingLeft:5,
    fontWeight:'bold'
  },
  textoTelefone2:{
    fontSize:17,
    color:'#000',
    marginRight:100,
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
});