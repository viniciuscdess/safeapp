import React,{useState} from 'react';
import { View,Text, StyleSheet, StatusBar, TextInput,
Button, TouchableOpacity } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function Ajuda() {
    const navigation = useNavigation();

 return (
   <View style={styles.container}>

    <StatusBar
        backgroundColor='transparent'
        barStyle='light-content'
        translucent={true}
    />


       <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingRight:50}}>
                <Icon name='arrow-left' size={20} color='#fff'/>
            </TouchableOpacity>

            <Text style={styles.tituloPrincipal}>Pagina de Duvidas</Text>
       </View>

        <Text style={styles.texto}>Nome dos meses:</Text>

       <View style={styles.componente}>
        <View style={styles.seismeses}>
                <Text style={styles.meses}>Jan</Text>

                <Text style={styles.meses}>Feb</Text>

                <Text style={styles.meses}>Mar</Text>

                <Text style={styles.meses}>Apr</Text>

                <Text style={styles.meses}>May</Text>

                <Text style={styles.meses}>Jun</Text>
        </View>
        

            <View style={styles.dozemeses}>
                <Text style={styles.meses}>Jul</Text>

                <Text style={styles.meses}>Aug</Text>

                <Text style={styles.meses}>Sep</Text>

                <Text style={styles.meses}>Oct</Text>

                <Text style={styles.meses}>Nov</Text>

                <Text style={styles.meses}>Dec</Text>
            </View>
        </View>

        
        <Text style={styles.gmtSigla}>GMT-3</Text>
        <View style={styles.viewGmt}>
            <Text style={styles.gmtSobre}>GMT ou Greenwich Mean Time (Hora Média em Greenwich) é a hora no meridiano que atravessa o laboratório astronómico da cidade de Greenwich no Reino Unido.</Text>
        </View>
        
        <Text style={styles.textoPergunta}>Alguma pergunta?</Text>
        <TextInput placeholder='digite aqui sua pergunta' style={styles.inputPergunta}  underlineColorAndroid='transparent'/>
        <Button title='enviar' onPress={() => alert('Em manutenção')}/>
       
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
      
    },
    tituloPrincipal:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        
    },
    header:{
        height:90,
        width:'100%',
        backgroundColor:'#16A085',
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        paddingTop: 0 + getStatusBarHeight(),
        flexDirection:'row'
    },
    texto:{
        fontWeight:'bold',
        fontSize:18,
        color:'#000'
    },
    componente:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    seismeses:{
        margin:10
    },
    dozemeses:{
        margin:10
    },
    meses:{
        fontSize:18,
        fontWeight:'bold',
        padding:8,
        color:'#16A085'
    },
    viewGmt:{
        height:60,
        borderWidth:1,
        margin:10,
        borderRadius:9
    },
    gmtSigla:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:10
    },
    gmtSobre:{
        fontSize:12,
        padding:8
    },
    textoPergunta:{
        fontSize:18,
        marginTop:30,
        marginBottom:5,
        fontWeight:'bold'
    },
    inputPergunta:{
        borderWidth:1,
        borderRadius:9,
        fontSize:14,
        width:300,
        marginBottom:5
    
    }


})