import React,{useState, useContext} from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, StatusBar, ActivityIndicator,  } from 'react-native';

import {AuthContext} from '../../contexts/auth';
import {Container, TituloPrincipal, Input, Botao, TextoBotao, Botao2, TextoBotao2, Header, Componente, TextoLogin, ViewBtn, Imagem } from './styles';

export default function Login() {
  const {signUp, loadingAuth, signIn} = useContext(AuthContext);

  const [login, setLogin, ] = useState(true);
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [name , setName] = useState('');

  function toggleLogin(){
    setLogin(!login);
  }

  function handleSignUp(){
    if(name === '' || email === '' || password === ''){
      console.log('Preencha todos os campos');
      return;
    }
    //cadastrando um ususario
    signUp(email, password, name);
  }

  function handleLogin(){
    if(email === '' || password === ''){
      console.log('Preencha todos os campos!');
      return;
    }
    signIn(email, password);
  }
  if(login){
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
       <Container style={{flex:1}}>
         <StatusBar
             backgroundColor='transparent'
             barStyle='light-content'
             translucent={true} />
                  
          <Componente>

          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TituloPrincipal>Safe
            <Text style={{color:'#e52246', marginRight:5}}>App</Text>
                
            </TituloPrincipal>
            <Imagem resizeMode="contain" source={require('../../Img/nephew.png')}/>
          </View>
       
            <Input 
            placeholder='digite seu email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
    
            <Input 
            placeholder='digite sua senha'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}/>
          </Componente>
           
          <ViewBtn>

          
            <Botao onPress={handleLogin}>
              {
                loadingAuth ? (
                  <ActivityIndicator color='#fff' size={20}/>
                ) 
                : 
                (
                    <TextoBotao>Logar</TextoBotao>
                )
              }
            </Botao>
            
            <Botao2 onPress={() => toggleLogin()}>
              <TextoBotao2>Criar uma conta</TextoBotao2>
            </Botao2>
            
            </ViewBtn>
            
          
           
       </Container>
      </TouchableWithoutFeedback>
     );
  }
 return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <Container>
      <StatusBar
          backgroundColor='transparent'
          barStyle='light-content'
          translucent={true} />

      <Componente>

      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TituloPrincipal>Safe
        <Text style={{color:'#e52246', marginRight:5}}>App</Text>
            
        </TituloPrincipal>
        <Imagem resizeMode="contain" source={require('../../Img/nephew.png')}/>
      </View>

        <Input 
        placeholder='digite seu name'
        value={name}
        onChangeText={(text) => setName(text)}
        />

        <Input 
        placeholder='digite seu email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        />

        <Input 
        placeholder='digite sua senha'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}/>
      </Componente>

        <Botao onPress={handleSignUp}>
        {
               loadingAuth ? (
                 <ActivityIndicator color='#fff' size={20}/>
               ) 
               : 
               (
                  <TextoBotao>Cadastrar</TextoBotao>
               )
             }
        </Botao>

        <Botao2 onPress={() => toggleLogin()}>
             <TextoBotao2>Já tenho uma conta</TextoBotao2>
        </Botao2>
        
    </Container>
   </TouchableWithoutFeedback>
  );
}