import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar, FlatList, Keyboard, TouchableWithoutFeedback, Button} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import firebase from '../../../services/firebaseConection';
import Listagem from '../../Clientes/ListagemClientes';





console.disableYellowBox=true;

export default function App({route, data}) {
  const navigation = useNavigation();

  const [lembrete, setLembrete] = useState('');
  const chaveCliente = route.params?.key;
  const [ble, setBle] = "jbkjj";
  const name = route.params?.nome;
  //const nome = route.params?.nome;


   async function salvar(){
    if(lembrete !== ''){

      let lembretes = await firebase.database().ref('lembretes');
      let chave = lembretes.push().key;

      lembretes.child(chave).set({
        lembrete: lembrete,
        idCliente: chaveCliente
      });

      alert('Lembrete adicionado com sucesso!' );
      setLembrete('');
    }
      navigation.navigate('Lembretes');
  }

  async function voltar(){
    navigation.navigate('Editar')
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

            <View style={styles.viewTextoPrincipal}>
              <Text style={styles.tituloPrincipal}>Adicionar Lembrete</Text>
              
            </View>
          </View>

            <View style={styles.viewInput}>
            <Text style={styles.titulos}>Adicionar um Lembrete Para</Text> 
            <Text style={styles.titulos}>  {name}  </Text>
        
            
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
              <TouchableOpacity style={styles.botao} onPress={salvar}> 
                <Text style={styles.botaoTexto}>SALVAR</Text>
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
    justifyContent:'space-around',
    padding:5,
    paddingTop: 0 + getStatusBarHeight(),
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
    fontSize:28,
    color:'#333333',
    fontWeight:'bold',
    marginRight:10,
    marginLeft:10,
    marginBottom:10,
    marginTop:5
  },
  viewInput:{
    alignItems:'center',
    justifyContent:'center'
  },
  input:{
    borderWidth:1,
    borderRadius:9, 
    fontSize:18,
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