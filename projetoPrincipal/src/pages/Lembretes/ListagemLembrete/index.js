import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';


export default function Listagem({ data, deleteItem }) {

  const navigation = useNavigation();

  function ver(){
    navigation.navigate('EditarLembrete', {key:data.key, lembrete:data.lembrete})
  }
//{data.dataLembrete.slice(0,2)}
return (
  <TouchableWithoutFeedback onLongPress={() => deleteItem(data.key)}> 
    <View style={styles.container}>

        <View style={styles.componente}>
          <View style={styles.viewLetra}>
            
            <Text style={styles.letra}>A</Text>
          </View>
          

          <View  style={styles.areaTexto}>
          <Text style={styles.texto}>{data.lembrete}</Text>
    
            <View style={styles.areaTextoNome}>
              
                
                <Text style={styles.textoNome}> {data.nome} </Text>
                
            </View>
            <Text style={styles.textoNome}> {data.date} </Text>
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
    width:'77%',
  },
  texto:{
    fontSize:18,
    fontWeight:'bold',
    color:'#333333',
    paddingLeft:3
  },
  areaTextoNome:{
    width:'77%',
    flexDirection:'row'
  },
  textoNome2:{
    fontWeight:'bold',
    fontSize:12,
    color:'#293241',
    
  },
  textoNome:{
    fontSize:12,
    color:'#293241',
  },
  botao:{
    padding:2
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