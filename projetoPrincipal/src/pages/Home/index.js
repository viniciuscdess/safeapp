import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, StatusBar,  TextInput, Image, Keyboard, TouchableOpacity } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../services/firebaseConection';
import { format, isToday, startOfToday } from 'date-fns';


export default function Home() {
  const [nome , setNome] = useState('');
  const [input , setInput] = useState('');

  const [mostrar, setMostrar] = useState();
  const [newDate, setNewDate] = useState( new Date());
  const [client, setClient] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lembrete, setLembrete] = useState([]);
  var hojeMaior = format(newDate, 'dd-MM-yyyy');
  var j = 0;

  const [lembrete3, setLembrete3] = useState([]);
  const [loading3, setLoading3] = useState(true);

  useEffect(() => {
    async function getStorage(){
      const nomeStorage = await AsyncStorage.getItem('nomes');
      if(nomeStorage !== null){
        setNome(nomeStorage);
      }
    }
    getStorage();
  }, []);

  useEffect( () => {      
    async function dados2() {            
        await firebase.database().ref('clientes').on('value', (snapshot)=> {
            setClient([]);
            snapshot.forEach( (childItem) => {            
                //retornaNome(childItem.key);
                let data2 = {                        
                    key: childItem.key
                
                };
                setClient(oldArray => [...oldArray, data2]);
            })
            setLoading2(false);
        })
    }    
    dados2();
    //alert("Você tem :" + client.length + " notas!!");
}, []);

useEffect( () => {          
  async function dados() {             
      await firebase.database().ref('lembretes').startAt(hojeMaior.toString()).orderByChild('date').on('value', (snapshot)=> {
        setLembrete([]);
          snapshot.forEach( (childItem) => {             
              let data = {                        
                  key: childItem.key,
               //   nome: retornaNome(childItem.key,childItem.val().idcliente,childItem.val().note),
                  nome: retornaNome(childItem.val().idCliente),
                  lembrete: childItem.val().lembrete,
                  dataLembrete: childItem.val().date,
                                         
              }; 
               
              setLembrete(oldArray => [...oldArray, data]);
          })
          setLoading(false);
      }) 
  }    
  dados();
}, [client]); 

function retornaNome(idCliente){   
         
  for(var i=0; i < client.length; i++) {
      if(client[i].key === idCliente) {
          if (j === 0){
              j++;
          }
        // let nomes =  client[i].name;
          return client[i].name;
      } 
  } 
}  

useEffect( () => {          
  async function dados() {             
      await firebase.database().ref('lembretes').on('value', (snapshot)=> {
        setLembrete3([]);
          snapshot.forEach( (childItem) => {             
              let data3 = {                        
                  key: childItem.key,
               //   nome: retornaNome(childItem.key,childItem.val().idcliente,childItem.val().note),
                  nome: retornaNome(childItem.val().idCliente),
                  lembrete: childItem.val().lembrete,
                  dataLembrete: childItem.val().date,
                                         
              }; 
               
              setLembrete3(oldArray => [...oldArray, data3]);
          })
          setLoading3(false);
      }) 
  }    
  dados();
}, [client]);


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

        { nome ?
        <View>
        <View style={styles.viewTexto}> 
          <Text style={styles.texto}>Olá,</Text>
          <Text style={styles.textoNome}>{nome}!</Text>
        </View>
    
        <View style={styles.numeroDeClientes}>
          <Text style={styles.textoNumeroDeClientes}>Quantidade De Clientes Cadastrados</Text>
          <Text style={styles.textoNumeroDeClientes2}>{client.length}</Text>
        </View>
        
        <View style={styles.viewLembretes}>
          <View style={styles.lembretes}>
            <Text style={styles.textoLembretes}>Lembretes</Text>
            <Text style={styles.textoLembretes2}>{lembrete3.length}</Text>
          </View>
    
          <View style={styles.lembretesDiarios}>
            <Text style={styles.textoLembretesDiarios}>Lembretes do Dia</Text>
            <Text style={styles.textoLembretesDiarios2}>{lembrete.length}</Text>
          </View>
        </View>
    
    
        <View style={styles.viewImg}>
          <Image style={styles.img} resizeMode="contain" source={require('../../Img/Finances.png')}/>
        </View> 
      </View>
        :

        <View style={styles.viewInput}>
          <Text style={styles.textoInput}>DIGITE SEU NOME:</Text>
          <TextInput
            placeholder='digite seu nome'
            style={styles.input}
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
    paddingTop: 0 + getStatusBarHeight(),
  },
  viewTexto:{
    alignItems:'center',
    flexDirection:'row',
  },
  texto:{
    fontSize:40,
    fontWeight:"bold",
    color:'#000',
    margin:10
  },
  textoNome:{
    fontSize:40,
    fontWeight:"bold",
    color:'#16A085',
  },
  numeroDeClientes:{
    backgroundColor:'#16A085',
    borderRadius:8,
    height:100,
    margin:10,
    alignItems:'center',
    paddingTop:10
  },
  textoNumeroDeClientes:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },
  textoNumeroDeClientes2:{
    color:'#fff',
    fontSize:35,
    fontWeight:'bold'
  },
  viewLembretes:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    height:100
  },
  lembretes:{
    borderWidth:1,
    width:'49%',
    alignItems:'center',
    paddingTop:5,
    borderRadius:8,
  },
  textoLembretes:{
    color:'#000',
    fontSize:18
  },
  textoLembretes2:{
    fontWeight:'bold',
    color:'#000',
    fontSize:30
  },
  lembretesDiarios:{
    backgroundColor:'#16A085',
    borderRadius:8,
    width:'49%',
    height:'100%',
    alignItems:'center',
    paddingTop:5,
  },
  textoLembretesDiarios:{
    color:'#fff',
    fontSize:18
  },
  textoLembretesDiarios2:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:30
  },
  viewImg:{
    alignItems:'center',
    width: '100%',
  },
  viewInput:{
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
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