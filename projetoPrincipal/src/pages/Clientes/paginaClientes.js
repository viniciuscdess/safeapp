import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, StatusBar, FlatList, TextInput, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';

import EditarCliente from './editarCliente';
import Listagem from './listagem';
import Cadastro from './cadastro';

import AdicionarLembrete from '../Lembretes/adicionarLembrete';
import EditarLembrete from '../Lembretes/editarLembrete';
import PaginaLembretes from '../Lembretes/paginaLembretes';


export default function PaginaClientes() {
  const navigation = useNavigation();
  const [clientes , setClientes] = useState([]);
  const [loading , setLoading] = useState(true);
  

  const {user} = useContext(AuthContext);


  useEffect(() => {
    const subscriber = firestore()
    .collection('clientes')
    .orderBy('created' , 'desc')
    .onSnapshot( snapshot => {
      const clienteList = [];
      snapshot.forEach(doc => {
        clienteList.push({
          ...doc.data(),
          //pega o id do cliente e nao do usario que esta logado
          id: doc.id,
        });
      });
      setClientes(clienteList);
      setLoading(false);
    })
    return () => subscriber();
  }, [])


  function cadastrar(){
    navigation.navigate('Cadastro')
  }

  async function handleDelete(key, data, id){
    await firestore().collection('clientes').doc(id).delete();
    
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
        onPress:() => excluir(id)
      }
      ]
    )
    return;
  }



  async function excluir(){
    await firestore().collection('lembretes').doc(docId).delete()
    .then(() => {
      console.log('edita com sucesso');
      alert('Lembrete excluido com sucesso')
      
    })
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
          renderItem={({item}) => ( <Listagem data={item} deleteItem={handleDelete} userId={user.uid} />  )}
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


