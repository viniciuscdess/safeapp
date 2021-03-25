import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, StatusBar,  TextInput, Image, Keyboard, TouchableOpacity } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
  const [nome , setNome] = useState('');
  const [input , setInput] = useState('');


  useEffect(() => {
    async function getStorage(){
      const nomeStorage = await AsyncStorage.getItem('nomes');
      if(nomeStorage !== null){
        setNome(nomeStorage);
      }
    }
    getStorage();
  }, [])

  useEffect(() => {
    async function saveStorage(){
      await AsyncStorage.setItem('nomes', nome);
    }

    saveStorage();

  }, [nome])


 async function salvar() {
   setNome(input)
   Keyboard.dismiss();
   setInput('');
  }


 return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor='transparent'
          barStyle='light-content'
          translucent={true}
        />

        <View style={styles.header}>

        </View>

        {
        nome ?

        <View style={styles.viewTexto}> 
          <Text style={styles.texto}>
            Seja Bem-Vinda!!
          </Text>
          <Text style={styles.textoNome}>{nome}</Text>


          <View style={styles.viewImg}>
            <Image  style={{width:100, height:100, marginTop:20}} resizeMode="contain" source={require('../../Img/logo.png')}/>
          </View> 
        </View>

        :

        <View style={styles.viewInput}>
          <Text style={styles.textoInput}>DIGITE SEU NOME:</Text>
          <TextInput
            placeholder='digite seu nome'
            style={styles.Input}
            value={input}
            onChangeText={(texto) => setInput(texto)}
            underlineColorAndroid='transparent'
          />
          
          <TouchableOpacity style={styles.botao} onPress={salvar}>
            <Text style={styles.botaoTexto}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      }
        
          
        

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
    paddingTop: 0 + getStatusBarHeight(),
  },
  viewTexto:{
    alignItems:'center'
  },
  texto:{
    fontSize:47,
    fontWeight:"bold",
    color:'#16A085',
    marginTop:'50%',
  },
  textoNome:{
    fontSize:47,
    fontWeight:"bold",
    color:'#16A085',
  },
  viewImg:{
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
  },
  viewInput:{
    alignItems:'center',
    justifyContent:'center',

  },
  Input:{
    backgroundColor:'#fff',
    width:350,
    fontSize:20,
    margin:18,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:9
  },
  textoInput:{
    color:'#333333',
    marginTop:'50%',
    fontWeight:'bold',
    fontSize:30,
  }, 
  botao:{
    borderWidth:1,
    height:50,
    width:'80%',
    backgroundColor:'#16A085',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6,
    margin:20
  },
  botaoTexto:{
    fontSize:18,
    fontWeight:'bold',
    color:'#131313'
  },

})