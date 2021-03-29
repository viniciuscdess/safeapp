import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';


export default function Listagem({ data, deleteItem }) {

  const navigation = useNavigation();

  function ver(){
    navigation.navigate('EditarLembrete', {key:data.key, lembrete:data.lembrete})
  }

return (
  <TouchableWithoutFeedback onLongPress={() => deleteItem(data.key)}> 
    <View style={styles.container}>
     
        <View style={styles.componente}>
   
        
        <View  style={styles.areaTexto}>
          
          <Text style={styles.texto}>{data.lembrete}</Text>
          
        </View>

        <View style={styles.areaTextoNome} >
          <Text style={styles.textoNome2}> Cliente:</Text>
          <Text style={styles.textoNome}> {data.nome} </Text>

          <TouchableOpacity onPress={() => ver(data)} style={styles.botao}>
                <Icon name="arrow-right" color="#000" size={30}/>
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
    alignItems:'center',
    marginTop:14,
  },
  componente:{
    width:'100%'
  },
  areaTexto:{
    backgroundColor:'#fff',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingLeft:5,
    paddingRight:5,
    
    
  },
  texto:{
    fontSize:25,
    fontWeight:'bold',
    color:'#333333',
    paddingLeft:5,
    
  },
  areaTextoNome:{
    backgroundColor:'#fff',
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:5,
    paddingTop:2,
    borderBottomWidth:1,
    borderColor:'#333333',
    
  },
  textoNome2:{
    fontWeight:'bold',
    fontSize:18,
    color:'#293241',
    paddingLeft:5,
    
  },
  textoNome:{
    fontSize:18,
    color:'#293241',
    
    
  },
  botao:{
    padding:2
  },
});