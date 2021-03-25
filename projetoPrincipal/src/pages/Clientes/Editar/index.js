import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar, FlatList, Modal} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';

import Clientes from '../PaginaClientes/index';
import firebase from '../../../services/firebaseConection';
import Lembretes from '../../Lembretes/PaginaLembretes';
import AdicionarLembrete from '../../Lembretes/AdicionarLembrete';



console.disableYellowBox=true;




export default function Editar({route}) {

  const chave = route.params?.key;
  const [nome, setNome] = useState(route.params?.nome);
  const [dataNascimento, setDataNascimento] = useState(route.params?.dataNascimento);
  const [cpf, setCpf] = useState(route.params?.cpf);
  const [matricula, setMatricula] = useState(route.params?.matricula);
  const [senha, setSenha] = useState(route.params?.senha);
  const [convenio, setConvenio] = useState(route.params?.convenio);
  const [endereço, setEndereço] = useState(route.params?.endereço);
  const [telefone,  setTelefone] = useState(route.params?.telefone);
  const [comentario,  setComentario] = useState(route.params?.comentario);
  const [estadoCivil, setEstadoCivil] = useState(route.params?.estadoCivil);
  
  const navigation = useNavigation('Clientes');
  

  async function salvar() { 
    await firebase.database().ref('clientes').child(chave).update({
      nome: nome,
      dataNascimento: dataNascimento,
      cpf: cpf,
      comentario:comentario,
      telefone:telefone,
      endereço:endereço,
      convenio:convenio,
      senha:senha,
      matricula:matricula,
  });
    navigation.navigate('Clientes');
  }
  
  
  function voltar(){
    navigation.navigate('Clientes');
  }

  function lembrete(data) {
    navigation.navigate('AdicionarLembrete'  ,{key: chave, nome: nome});
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
            <Icon name="arrow-left" color="#fff" size={30}/>
          </TouchableOpacity> 
        </View>
       
        <View style={styles.viewTextoPrincipal}>
          <Text style={styles.tituloPrincipal}>Editar</Text>
        </View>

        <View style={styles.viewBotaoEditar}>
        <TouchableOpacity style={styles.botaoEditar} onPress={lembrete}> 
          <Icon name='bookmark' color='#fff' size={28}/>
        </TouchableOpacity>
      </View>
        
      </View>


      <Text style={styles.subTitulos}>Dados Pessoais</Text>

      <Text style={styles.titulos}>Nome:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: João da Silva'
        value={nome}
        onChangeText={(texto) => setNome(texto)}
        autoCapitalize = 'sentences'
      />

      <Text style={styles.titulos}>Data de nascimento:</Text>
      <View style={styles.viewDataNascimento}>
        <DatePicker
          style={{width:'90%', marginLeft:15, marginBottom:10, backgroundColor:'#fff'}}
          date={dataNascimento}
          value={dataNascimento}
          format="DD-MM-YYYY"
          minDate="01-01-1920"
          maxDate="31-12-2021"
          onDateChange={setDataNascimento}
        />
      </View>
     
      <Text style={styles.titulos}>CPF:</Text>
      <TextInputMask
        placeholder='065.231.321-21'
        style={styles.input}
        type={'cpf'}
        value={cpf}
        onChangeText={(texto) => setCpf(texto)}
      />

      <Text style={styles.titulos}>Telefone:</Text>
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

      <Text style={styles.titulos}>Matricula:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: 123456789000'
        value={matricula}
        onChangeText={(texto) => setMatricula(texto)}
      />
      
      <Text style={styles.titulos}>Senha:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: SenhaPadrao000'
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
      />

      <Text style={styles.titulos}>Convenio:</Text>
      <Picker
        selectedValue={convenio}
        onValueChange={(value) =>
          setConvenio(value)}
        style={styles.picker}
      >
        <Picker.Item label="Prefeitura" value="prefeitura" />
        <Picker.Item label="GovernoEstado" value="governoEstado" />
      </Picker>

      <Text style={styles.subTitulos}>Endereço</Text>

      <Text style={styles.titulos}>Logradouro:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Ex: Avenida Arthur Thomas 213'
        value={endereço}
        onChangeText={(texto) => setEndereço(texto)}
        autoCapitalize = 'sentences'
      />

      
      <Text style={styles.subTitulos}>Observação</Text>

     
      <Text style={styles.titulos}>Comentario:</Text>
      <TextInput
        style={styles.inputComentario}
        underlineColorAndroid='transparent'
        placeholder='Ex: Este cliente pediu para falar com a vó dele'
        value={comentario}
        onChangeText={(texto) => setComentario(texto)}
        multiline={true}
        numberOfLines={3}
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
    justifyContent:'space-between',
    padding:5,
    paddingTop: 0 + getStatusBarHeight(),
  },
  viewVoltar:{
    
  },
  viewTextoPrincipal:{
    
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
    fontSize:40,
    fontWeight:'bold',
    color:'#fff',
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
    margin:20
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
  picker:{
    marginLeft:15,
    marginBottom:10,
    marginRight:10,
    fontSize:18,
    backgroundColor:'#D9D2D1',
    height:50
  },
  botaoEditar:{
    
  }
})