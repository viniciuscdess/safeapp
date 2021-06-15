import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';
import { addHours, format, getDate, getDay } from 'date-fns';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../contexts/auth';

console.disableYellowBox=true;

export default function AdicionarLembrete({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [lembrete, setLembrete] = useState('');
  const [nome, setNome] = useState('');
  const chaveCliente = route.params?.id;
  const name = route.params?.nome;

  const [newDate, setNewDate] = useState( new Date());
  var hojeMaior = format(newDate, 'dd-MM-yyyy');

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

  async function salvar(){
    await firestore().collection('lembretes')
   .add({
    dataLembrete: new Date(data), 
  //  dataLembrete:  firebase.firestore.Timestamp.fromDate(new Date(data)),
    autor: user.nome,
    userId: user.uid,
    idCliente : chaveCliente,
    lembrete: lembrete
   })
   .then(() => {
       console.log('Post criado');
   })
   .catch((error) => {
       console.log(error);
   })
   navigation.navigate('Lembretes');
   setLembrete('');
   setData('');
}

  function ajuda(){
      navigation.navigate('Ajuda');
    }


   function voltar(){
    navigation.navigate('EditarCliente');

  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
      <View style={styles.container}>
        <ScrollView //tirar a barra de rolagem 
        showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor='transparent'
          barStyle='light-content'
          translucent={true}/>

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
              <Text style={styles.titulos}>Adicionando um lembrete para</Text> 
              <Text style={styles.titulos2}>  {name}  </Text>
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

            <Text style={styles.textoData}>Data Do lembrete: GMT-3</Text>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              maxLength={50}
              style={styles.inputData}
              underlineColorAndroid='transparent'
              placeholder='Ex: data/mes(letra)/ano/GMT-3'
              value={data}
              onChangeText={(texto) => setData(texto)}
              autoCapitalize = 'sentences'
            />      
          </View>
          
          <View style={styles.viewBotao}>
            <TouchableOpacity style={styles.botao} onPress={salvar}> 
              <Text style={styles.botaoTexto}>SALVAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewBotaoData}>
            <TouchableOpacity style={styles.botaoAjuda} onPress={ajuda}> 
              <Text style={styles.botaoTextoAjuda}>Precisa de ajuda?</Text>
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
    fontSize:30,
    fontWeight:'bold',
    color:'#fff',
  },
  titulos:{
    fontSize:22,
    color:'#333333',
    fontWeight:'bold',
    marginRight:10,
    marginLeft:10,
    marginTop:2
  },
  titulos2:{
    fontSize:22,
    color:'#333333',
    fontWeight:'bold',
    marginRight:10,
    marginLeft:10,
    marginBottom:10
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
    height:250
  },
  inputData:{
    borderWidth:1,
    borderRadius:9,
    marginTop:10,
    width:300,
    height:50,
    fontSize:12
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
  },
  textoData:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:10,
    alignItems:'baseline'
  },
  botaoAjuda:{
    width:200,
    alignItems:'flex-end',
    margin:10
  },
  botaoTextoAjuda:{
    color:'#ccc',
    fontSize:14,
  },
  viewBotaoData:{
    alignItems:'flex-end',
    justifyContent:'flex-end'
  }

})