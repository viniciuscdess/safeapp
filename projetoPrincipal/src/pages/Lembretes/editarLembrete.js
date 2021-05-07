import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar, FlatList, Keyboard, TouchableWithoutFeedback, Button} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import firestore from '@react-native-firebase/firestore';


import Cadastro from '../Clientes/cadastro';
import EditarCliente from '../Clientes/editarCliente';
import PaginaClientes from '../Clientes/paginaClientes';

import AdicionarLembrete from './adicionarLembrete';
import Listagem from './listagem';
import PaginaLembretes from './paginaLembretes';

export default function EditarLembrete({route}) {
    const navigation = useNavigation();
    const id = route.params?.id;
    //const chaveCliente = route.params?.id;
    const [lembrete, setLembrete] = useState(route.params?.lembrete);
   
    async function editar(){
      await firestore().collection('lembretes').doc(id).update({
        lembrete: lembrete
      })
      .then(() => {
        console.log('edita com sucesso');
        setLembrete('');
        navigation.goBack();
      })
     
    }

    async function excluir(){
      await firestore().collection('lembretes').doc(id).delete().then(() => {
        alert('excluido');
        setLembrete('');
        navigation.goBack();
      })
    }
    
    async function voltar(){
      navigation.navigate('Lembretes')
    }

   
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <View style={styles.container}>
          <ScrollView //tirar a barra de rolagem 
          showsVerticalScrollIndicator={false} >
          <StatusBar
            backgroundColor='transparent'
            barStyle='light-content'
            translucent={true}
          />
  
            <View style={styles.header}>
              
              <View style={styles.viewVoltar}>
                <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
                  <Icon name="arrow-left" color="#fff" size={30}/>
                </TouchableOpacity> 
              </View>
  
             
                <Text style={styles.tituloPrincipal}>Editar Lembrete</Text>
             
            
             
            </View>
  
              <View style={styles.viewInput}>
              <Text style={styles.titulos}>Digite seu Lembrete:</Text>
                <TextInput
                  multiline = {true}
                  numberOfLines = {4}
                  maxLength={50}
                  style={styles.input}
                  underlineColorAndroid='transparent'
                  placeholder='Ex: Ligar para o João'
                  value={lembrete}
                  onChangeText={(texto) => setLembrete(texto)}
                  autoCapitalize = 'sentences'
                />
            </View>
  
            <View style={styles.viewBotao}>
                <TouchableOpacity style={styles.botao} onPress={editar}> 
                  <Text style={styles.botaoTexto}>SALVAR</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewBotao}>
                <TouchableOpacity style={styles.botao} onPress={excluir}> 
                  <Text style={styles.botaoTexto}>excluir</Text>
                </TouchableOpacity>
              </View>
  
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
    },
   header:{
      backgroundColor:'#16A085',
      flexDirection:'row',
      alignItems:'center',
      padding:5,
      paddingTop: 0 + getStatusBarHeight(),
      justifyContent:'space-around'
    },
    viewBotaoEditar:{
      alignItems:'center',
      justifyContent:'center'
    },
    botaoVoltar:{
      fontSize:20,
      color:'#fff',
    
    },
    tituloPrincipal:{
      fontSize:35,
      fontWeight:'bold',
      color:'#fff',
    },
    titulos:{
      fontSize:22,
      color:'#333333',
      fontWeight:'bold',
      margin:10
    },
    viewInput:{
      alignItems:'center',
      justifyContent:'center'
    },
    input:{
      borderWidth:1,
      borderRadius:9, 
      fontSize:14,
      backgroundColor:'#fff',
      width:350,
      alignItems:'center',
      height:350
    },
    viewBotao:{
      height:90,
      alignItems:'center',
      justifyContent:'flex-end',
    },
    botao:{
      height:50,
      width:'80%',
      backgroundColor:'#16A085',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:6,
      margin:20
    },
    botaoTexto:{
      fontSize:20,
      fontWeight:'bold',
      color:'#fff'
    },
    viewLista:{
      backgroundColor:'#fff',
      }
  })