import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format, isToday, startOfToday } from 'date-fns';
import firebase from '../../../services/firebaseConection';

export default function Listagem({ data, deleteItem}) {

  const navigation = useNavigation('Editar');

  function ver(data) {
    navigation.navigate('Editar', {key: data.key, nome:data.nome, dataNascimento: data.dataNascimento, cpf: data.cpf, matricula: data.matricula, senha: data.senha, convenio:data.convenio, endereço:data.endereço, telefone: data.telefone, comentario:data.comentario, estadoCivil: data.estadoCivil})
  }

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

  useEffect( () => {      
    async function dados2() {            
        await firebase.database().ref('clientes').on('value', (snapshot)=> {
            setClient([]);
            snapshot.forEach( (childItem) => {            
                //retornaNome(childItem.key);
                let data2 = {                        
                  key: childItem.key,
                  nome:childItem.val().nome,
                };
                setClient(oldArray => [...oldArray, data2]);
            })
            setLoading2(false);
        })
    }    
    dados2();
    //alert("Você tem :" + client.length + " notas!!");
}, []);

function nome4(){
nome.slice(0, 1)
}

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data.key)}> 
      <View style={styles.container}>
        <View style={styles.componente}>

          <View style={styles.viewLetra}>
            <Text style={styles.letra}>{data.nome.slice(0,1)}</Text>
          </View>

          <View  style={styles.areaTexto}>
            <Text style={styles.texto}>{data.nome}</Text>
            <Text style={styles.textoTelefone2}>{data.telefone} </Text>
          </View>

          <View style={styles.viewBotaoVer}>
            <TouchableOpacity onPress={() => ver(data)} style={styles.botaoVer}>
                  <Icon name="chevron-right" color="#000" size={30} />
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
    width:'77%'
  },
  texto:{
    fontSize:18,
    fontWeight:'bold',
    color:'#333333',
  },
  viewBotaoVer:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    
  },
  botaoVer:{
    marginRight:50
  },
  areaTextoTelefone:{
    backgroundColor:'#fff',  
    borderBottomWidth:1,
    flexDirection:'row'
  },
  textoTelefone:{
    fontSize:12,
    color:'#000',
   
    fontWeight:'bold'
  },
  textoTelefone2:{
    fontSize:14,
    color:'#000',
    
  },
  botao:{
    padding:5,
    borderRadius:9,
    marginBottom:2,
  },
  botaoTexto:{
    fontWeight:'bold',
    color:'#fff'
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