import React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './src/pages/Home';
import Cadastro from './src/pages/Clientes/Cadastro';
import Clientes  from './src/pages/Clientes/PaginaClientes';
import Editar from './src/pages/Clientes/Editar';
import Lembretes from './src/pages/Lembretes/PaginaLembretes';
import AdicionarLembrete from './src/pages/Lembretes/AdicionarLembrete';
import EditarLembrete from './src/pages/Lembretes/editar';
 

const  Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  Home:{
    name:'home'
  },
  Clientes:{
    name:'users'
  },
  Lembretes:{
    name:'list-alt'
  },
};




function Tabs() {
 return (   
     <Tab.Navigator
      screenOptions={({route}) =>
        ({
          tabBarIcon: ({color, size}) =>
          {
            const { name} = icons[route.name];
            return <Icon name={name} color={color} size={size} />
          }
        })}
        tabBarOptions={{
          style:{
            backgroundColor:'#16A085',
          },
          activeTintColor:'#FFFFFF',
          inactiveTintColor:'#333333'
        }}
     >
       <Tab.Screen name="Home" component={Home}/>
       <Tab.Screen name="Clientes" component={Clientes}/>
       <Tab.Screen name="Lembretes" component={Lembretes}/>
       
      
     </Tab.Navigator>
   
  );
}

export default function App() {
  return(
    <NavigationContainer>
      
        <Stack.Navigator>
          <Stack.Screen
            name='Clientes' component={Tabs}
            options={{headerShown:false}}
          />
          
          <Stack.Screen
            name='Editar' component={Editar}
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

          <Stack.Screen
            name='EditarLembrete' component={EditarLembrete}
            options={{headerShown:false}}
          />
        </Stack.Navigator>
       
    </NavigationContainer>
  )
}