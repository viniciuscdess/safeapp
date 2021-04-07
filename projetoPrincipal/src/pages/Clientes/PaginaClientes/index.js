import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, StatusBar, FlatList, TextInput, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import firebase from '../../../services/firebaseConection';
import Listagem from '../ListagemClientes';


export default function Clientes() {
  const navigation = useNavigation();
  const [clientes , setClientes] = useState([]);
  const [loading , setLoading] = useState(true);


  
  useEffect(() => {
      async function dados(){
        await firebase.database().ref('clientes').on('value', (snapshot) => {
          setClientes([]);
          //vai percorrer tudo dentro do banco de dados
         snapshot.forEach((chilItem) => {
           let data = {
             key: chilItem.key,
             nome:chilItem.val().nome,
             dataNascimento:chilItem.val().dataNascimento,
             cpf:chilItem.val().cpf,
             matricula:chilItem.val().matricula,
             senha:chilItem.val().senha,
             convenio:chilItem.val().convenio,
             endereço:chilItem.val().endereço,
             telefone:chilItem.val().telefone,
             comentario:chilItem.val().comentario
           };
           setClientes(oldArray => [...oldArray, data]);
         })
         setLoading(false)
        })
      }
      dados();
  },[])

  function cadastrar(){
    navigation.navigate('Cadastro')
  }

  async function handleDelete(key, data){
    //await firebase.database().ref('clientes').child(key).remove();
    Alert.alert(
      'Cuidado Atenção!',
      `Você realmente deseja excluir??`,
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

async function handleDeleteSucess(key,data) {
  await firebase.database().ref('clientes').child(key).remove();
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

        <View style={styles.viewTexto}> 
          <Text style={styles.textoHeader}>Clientes</Text>
        </View>




        <View style={styles.viewBotao}> 
        <TouchableOpacity style={styles.botao} onPress={cadastrar}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
        </View>
      </View>
     


      {loading ? 
        (
            <ActivityIndicator color='#121212' size={45} />
        ):
        (
          
          <View style={styles.containerLista}>
         

             <View style={styles.viewLista}>
              <FlatList
                keyExtractor={item => item.key}
                data={clientes}
                renderItem={({item}) => ( <Listagem data={item} deleteItem={handleDelete} /> )}
              />
            </View>
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
    alignItems:'center'
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
  viewBotao:{
    justifyContent:'center',
    marginLeft:80,
  },
  botao:{
    height:35,
    width:30,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6,
  },
  botaoTexto:{
    fontSize:20,
    fontWeight:'bold',
    color:'#293241'
  },
  containerLista:{
  
  },
  viewLetra:{
    backgroundColor:'#16A085',
    width:'10%',
    borderRadius:100
  },
  viewTexto:{
   marginLeft:120,
   justifyContent:'center'
  },
  viewLista:{
  backgroundColor:'#fff',
  
  }
})