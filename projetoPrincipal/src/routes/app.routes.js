//quando estiver logado
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Cadastro from '../pages/Clientes/cadastro';
import PaginaClientes  from '../pages/Clientes/paginaClientes';
import EditarCliente from '../pages/Clientes/editarCliente';

import Home from '../pages/Home';

import PaginaLembretes from '../pages/Lembretes/paginaLembretes';
import AdicionarLembrete from '../pages/Lembretes/adicionarLembrete';
import EditarLembrete from '../pages/Lembretes/editarLembrete';
import Ajuda from '../pages/Lembretes/ajuda'; 


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  Home:{
    name:'home'
  },
  Clientes:{
    name:'users'
  },
  Lembretes:{
    name:'list'
  },
};


function StackScreen() {
  return(
        <Stack.Navigator>
          <Stack.Screen
            name='Clientes' component={PaginaClientes}
            options={{headerShown:false}}
          />
          
          <Stack.Screen
            name='EditarCliente' component={EditarCliente}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name='Cadastro' component={Cadastro}
            options={{headerShown:false}}
          />
            <Stack.Screen
            name='AdicionarLembrete' component={AdicionarLembrete}
            options={{headerShown:false}}
          />

        </Stack.Navigator>
  )
}

function StackScreenLembrete() {
  return(
        <Stack.Navigator>
         <Stack.Screen
            name='Lembretes' component={PaginaLembretes}
            options={{headerShown:false}}
          />
        
          <Stack.Screen
            name='EditarCliente' component={EditarCliente}
            options={{headerShown:false}}
          />
          
            <Stack.Screen
            name='AdicionarLembrete' component={AdicionarLembrete}
            options={{headerShown:false}}
          />

          <Stack.Screen
            name='Ajuda' component={Ajuda}
            options={{headerShown:false}}
          />

          <Stack.Screen
            name='EditarLembrete' component={EditarLembrete}
            options={{headerShown:false}}
          />
          
          
        </Stack.Navigator>
  )
}

function AppRoutes() {
 return (   
     <Tab.Navigator
     tabBarOptions={{
       keyboardHidesTabBar:true
     }}
      screenOptions={({route}) =>
        ({
          tabBarIcon: ({color, size}) =>
          {
            const { name } = icons[route.name];
            return <Icon name={name} color={color} size={size} />
          }
        })}

        tabBarOptions={{
          //mostra o nome com os icones
          showLabel:true ,
           //se tiver um teclado a tab bar nao sobe junto(fecha a tab bar)
          keyboardHidesTabBar:true,
          style:{
            backgroundColor:'#16A085',
            borderTopWidth:0
          },
          activeTintColor:'#FFFFFF',
          inactiveTintColor:'#333333',
        }}
     >
       <Tab.Screen name="Home" component={Home}/>
       <Tab.Screen name="Clientes" component={StackScreen}/>
       <Tab.Screen name="Lembretes" component={StackScreenLembrete}/>
       
      
     </Tab.Navigator>
   
  );
}


export default AppRoutes;