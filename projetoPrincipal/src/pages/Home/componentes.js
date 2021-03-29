import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Componente() {
 return (
    <View>
    <View style={styles.viewTexto}> 
      <Text style={styles.texto}>Olá,</Text>
      <Text style={styles.textoNome}>{nome}!</Text>
    </View>

    <View style={styles.numeroDeClientes}>
      <Text style={styles.textoNumeroDeClientes}>Quantidade De Clientes Cadastrados</Text>
      <Text style={styles.textoNumeroDeClientes2}>sdfs1</Text>
    </View>
    
    <View style={styles.viewLembretes}>
      <View style={styles.lembretes}>
        <Text style={styles.textoLembretes}>Lembretes</Text>
        <Text style={styles.textoLembretes2}>1021</Text>
      </View>

      <View style={styles.lembretesDiarios}>
        <Text style={styles.textoLembretesDiarios}>Lembretes do Dia</Text>
        <Text style={styles.textoLembretesDiarios2}>10</Text>
      </View>
    </View>


    <View style={styles.viewImg}>
      <Image style={styles.img} resizeMode="contain" source={require('../../Img/Finances.png')}/>
    </View> 
  </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop: 0 + getStatusBarHeight(),
      },
      header:{
        backgroundColor:'#16A085',
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
