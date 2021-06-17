import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, TouchableWithoutFeedback, Alert } from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { format, getDate, getDay } from 'date-fns';

export default function Listagem({ data, deleteItem }) {
  const navigation = useNavigation();
  const docId = data.id;
  
   function ver(data){
    navigation.navigate('EditarLembrete', {id:data.id,lembrete:data.lembrete});
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

  async function excluir(){
    await firestore().collection('lembretes').doc(docId).delete()
    .then(() => {
      console.log('edita com sucesso');
      alert('Lembrete excluido com sucesso')
      
    })
  }



  const diaHoje = format(new Date(), 'dd/mm/yyyy')
  const newDate = new Date();

function chamaHoje(){
  let newDate = new Date();
  let hojeMaior = format(newDate, 'MM/dd/yy');

  let hoje = hojeMaior ;

  return hoje;
}


 function converterData(dataTimeStamp){

  let d     = new Date( dataTimeStamp._seconds * 1000).toLocaleDateString('ban', 'id');
  let diadeHoje = format(new Date(),  'MM/dd/yy');

 if( d.toString() == diadeHoje.toString() ) {
    return true;
  }

 }

function lembrar(dataTimeStamp){

}

return (
  <TouchableWithoutFeedback onLongPress={handleDelete}> 
  
    <View style={styles.container}>
     
        {
          converterData(data.dataLembrete) ? 
        (
            <View style={styles.componente}>    
                <View  style={styles.areaTexto}>

                  <View style={{flexDirection:'row', alignItems:'center', marginTop:2}}>

                    <View style={styles.viewDia}> 
                      <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}> {diaHoje.slice(0,2)}</Text>
                    </View>


                    <Text style={styles.texto}>{data.lembrete}</Text>
                    
                  </View>

        

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
        )
          :

            <View><Text style={{color:'#fff' , fontSize:0.1}}> . </Text></View> 
      
        }
     
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
    margin:5,
    justifyContent:'center'
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
  viewDia:{
    backgroundColor:'#16A085', 
    width:40, 
    height:40, 
    borderRadius:50, 
    alignItems:'center',
    justifyContent:'center',
    paddingRight:5

  }
});