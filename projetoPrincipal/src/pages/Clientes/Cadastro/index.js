import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import {Picker} from '@react-native-picker/picker';

import Listagem from '../ListagemClientes';
import Clientes from '../PaginaClientes';
import firebase from '../../../services/firebaseConection';
import Lembretes from '../../Lembretes/PaginaLembretes';




 

export default function App() {
  const [estadoCivil, setEstadoCivil] = useState();


  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [convenio, setConvenio] = useState();
  const [endereço, setEndereço] = useState('');
  const [telefone,  setTelefone] = useState('');
  const [comentario,  setComentario] = useState('');
  const navigation = useNavigation('Clientes');
  

  const [data, setData] = useState('');
  

  async function salvar(){
    // se os states (nome, senha etc) for difrente de vazio deixa entrar
    if(nome !== '' && 
       dataNascimento !== '' && 
       cpf !== '' && 
       matricula !== '' && 
       senha !== '' && 
       convenio !== '' && 
       endereço !== '' && 
       telefone !== '' && 
       comentario !== '' ){
        
        let clientes = await firebase.database().ref('clientes');
 
        // let chave esta criando uma key aleatoria que nunca vai se repertir
        let chave = clientes.push().key;
        alert('3');
        clientes.child(chave).set({
          nome: nome,
          senha: senha,
          convenio: convenio,
          cpf: cpf,
          matricula : matricula,
          endereço:endereço,
          dataNascimento:dataNascimento,
          telefone: telefone,
          comentario : comentario,
          estadoCivil: estadoCivil
        });
        
      alert('Seu Cadastro foi enviado com sucesso!!!');
      setNome('');
      setDataNascimento('');
      setCpf('');
      setMatricula('');
      setSenha('');
      setConvenio('');
      setEndereço('');
      setTelefone('');
      setComentario('');
      setEstadoCivil();
    }
    navigation.navigate('Clientes');
  }
 
    
  function voltar(){
    navigation.navigate('Clientes');
  }



 return (


    <View style={styles.container}>
      <ScrollView
      //tirar a barra de rolagem
        showsVerticalScrollIndicator={false}
      >
        
      

      <StatusBar
        backgroundColor='transparent'
        barStyle='light-content'
        translucent={true}
      />

      <View style={styles.header}>
        <View style={styles.viewVoltar}>
          <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
            <Text style={styles.textoVoltar}>Voltar</Text>
          </TouchableOpacity> 
        </View>
       
        <View style={styles.viewTextoPrincipal}>
          <Text style={styles.tituloPrincipal}>Cadastro</Text>
        </View>
      </View>
      


      <Text style={styles.subTitulos}>Dados Pessoais</Text>

      <Text style={styles.titulos}>NOME:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: João da Silva'
        value={nome}
        onChangeText={(texto) => setNome(texto)}
        autoCapitalize = 'sentences'
      />

      <Text style={styles.titulos}>DATA:</Text>
      
        <DatePicker
          style={{
            width:'90%',
            marginLeft:15,
            marginBottom:10,
            backgroundColor:'#fff'}}
          date={dataNascimento}
          value={dataNascimento}
          format="DD-MM-YYYY"
          minDate="01-01-1920"
          maxDate="31-12-2021"
          onDateChange={setDataNascimento}
        />
      
     
      <Text style={styles.titulos}>CPF:</Text>
      <TextInputMask
        placeholder='065.231.321-21'
        style={styles.input}
        type={'cpf'}
        value={cpf}
        onChangeText={(texto) => setCpf(texto)}
      />

      <Text style={styles.titulos}>TELEFONE:</Text>
      <TextInputMask
      placeholder='(55) 43 9652-3291'
        style={styles.input}
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        value={telefone}
        onChangeText={(texto) => setTelefone(texto)}
      />

      <Text style={styles.titulos}>Estado Civil:</Text>
      <Picker
        selectedValue={estadoCivil}
        onValueChange={(value) =>
          setEstadoCivil(value)}
        style={styles.picker}
      >
        <Picker.Item label="Solteiro" value="solteiro" />
        <Picker.Item label="Casado" value="casado" />
        <Picker.Item label="Separado" value="separado" />
        <Picker.Item label="Divorciado" value="divorciado" />
        <Picker.Item label="Viuvo" value="viuvo" />
      </Picker>

      <Text style={styles.subTitulos}>Dados Bancarios</Text>

      <Text style={styles.titulos}>MATRICULA:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: 123456789000'
        value={matricula}
        onChangeText={(texto) => setMatricula(texto)}
        keyboardType='numeric'
      />
      
      <Text style={styles.titulos}>SENHA:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: SenhaPadrao000'
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
      />

      <Text style={styles.titulos}>CONVENIO:</Text>
      <Picker
        selectedValue={convenio}
        onValueChange={(value) =>
        setConvenio(value)}
        style={styles.picker}
      >
        <Picker.Item label="Prefeitura" value="prefeitura" />
        <Picker.Item label="GovernoEstado" value="governoEstado" />
      </Picker>

      <Text style={styles.subTitulos}>Endereço:</Text>

      <Text style={styles.titulos}>Logradouro:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: Avenida Arthur Thomas 213'
        value={endereço}
        onChangeText={(texto) => setEndereço(texto)}
        autoCapitalize = 'sentences'
      />

      <Text style={styles.subTitulos}>Oberservaçao:</Text>
      
      <Text style={styles.titulos}>COMENTARIO:</Text>
      <TextInput
        multiline = {true}
        numberOfLines = {4}
        maxLength={20}
        style={styles.inputComentario}
        underlineColorAndroid='transparent'
        placeholder='Ex: Este cliente pediu para falar com a vó dele'
        value={comentario}
        onChangeText={(texto) => setComentario(texto)}
        autoCapitalize = 'sentences'
      />

      <View style={styles.viewBotao}>
        <TouchableOpacity style={styles.botao} onPress={salvar}> 
          <Text style={styles.botaoTexto}>SALVAR</Text>
        </TouchableOpacity>
      </View>


      </ScrollView>
    </View>
  
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
    paddingTop: 0 + getStatusBarHeight(),
  },
  viewVoltar:{
    justifyContent:'center',
  },
  textoVoltar:{
    fontSize:20,
    color:'#fff',
    marginLeft:5
  },
  viewTextoPrincipal:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:70
  },
  tituloPrincipal:{
    fontSize:40,
    fontWeight:'bold',
    color:'#fff',
    justifyContent:'center',
    alignItems:'center',
  },
  subTitulos:{
    fontSize:28,
    color:'#333333',
    fontWeight:'bold',
    marginLeft:15,
    marginBottom:5,
    marginTop:5
  },
  titulos:{
    fontSize:18,
    color:'#333333',
    marginLeft:15,
    marginTop:2
  },
  input:{
    borderWidth:0.7,
    borderRadius:9, 
    marginLeft:15,
    marginBottom:10,
    marginRight:10,
    fontSize:18,
    backgroundColor:'#fff',
    height:40
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
    margin:20,
    
  },
  botaoTexto:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fff'
  },
  inputComentario:{
    borderWidth:0.7,
    borderRadius:9,
    marginLeft:15,
    marginBottom:10,
    marginRight:10,
    fontSize:20,
    backgroundColor:'#fff',
    height:120
  },
  dataNascimento:{
    backgroundColor:'#293241',
    width:'90%',
    color:'#fff',
    margin:90
  },
  picker:{
    marginLeft:15,
    marginBottom:10,
    marginRight:10,
    fontSize:18,
    backgroundColor:'#D9D2D1',
    height:50
  }
})