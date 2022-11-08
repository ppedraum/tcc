import {React} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#004475',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerfeed: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#004475',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    post_cell:{
      display: 'flex',
      alignItems: 'flex-start',
      margin: 10,
    },
    titulo:{
      fontWeight : 'bold',
      fontSize : 30,
      color:'white',
      paddingBottom:10,
      paddingTop:20
    },
    titulofeed: {
      fontWeight : 'bold',
      fontSize : 30,
      color:'white',
      paddingBottom:10,
      paddingTop:40,
      alignItems: 'center',
      justifyContent: 'center',
      display:'flex',
    },
    titulocontainer: {
      display:'flex',
      alignItems:'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: '#004475',
    },
    titulo_galeria:{
      fontWeight : 'bold',
      fontSize : 15
    },
    conteudo:{
      fontSize : 20,
      color:'white'
    },
    conteudobold:{
      fontSize : 20,
      color:'white',
      fontWeight:'bold'
    },
    smalltext:{
      fontSize:17,
      color:'white'
    },
    conteudo_galeria:{
      fontSize : 15
    },
    input:{
        width : Dimensions.get('window').width * 0.7,
        height: 40,
        padding : 10,
        margin : 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        fontSize: 20,
        paddingBottom:5,
        paddingTop: 5
    },
    pickerInput:{
        width : Dimensions.get('window').width * 0.7,
        height: 40,
        padding : 10,
        margin : 10,
        backgroundColor: '#D0EBFF',
        color: 'black',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 15
    },
    searchContainer:{
        display: 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor: '#004475',
        paddingLeft:30,
        paddingRight:30,
        paddingBottom: 20,
        height: Dimensions.get('window').height * 0.1,
    },
    filtros_container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    galeria_cell:{
        borderColor: '#4490F5',
        borderWidth: 1,
        display: 'flex',
        alignItems: 'flex-start',
        width: 130,
        height: 'auto'
    },
    galeria_cell_foto:{
      borderColor: '#4490F5',
      borderWidth: 1,
      display: 'flex',
      alignItems: 'flex-start',
      width: 230,
      height: 'auto'
    },
    flatlist_cell:{
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
      backgroundColor : '#99B3FF',
      minWidth: 370
    },
    flatlist_cell_evento:{
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
      backgroundColor : '#5BF085',
      minWidth: 370
    },
    bt_desinscrever:{
      backgroundColor:'#2B703E'
    },
    foto_perfil:{
      width:200,
      height:200,
      marginVertical:20,
    },
    foto_galeria:{
      width:150,
      height:150,
    },
    sanfona:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
      backgroundColor : '#99B3FF',
      width: Dimensions.get('window').width - 20
    },
    botao:{
      alignItems: 'center',
      backgroundColor: '#D0EBFF',
      padding: 10,
      borderRadius:15,
      width: 100,
      margin:10,
      border: 2,
      borderStyle: 'solid',
      borderColor: 'black',
      color: 'black',
      fontSize: 10
    }, 
    botaoC:{
      backgroundColor: '#D0EBFF',
      padding: 10,
      borderRadius:15,
      width: 150,
      margin:10,
      border: 2,
      borderStyle: 'solid',
      borderColor: 'black',
      color: 'black',
      display:'flex',
     justifyContent: 'center',
      alignItems:'center'
    },
    bt_container:{
      display:'flex', 
      alignItems:'center'
    },
    botaofeed1: {
      alignItems: 'center',
      backgroundColor: '#D0EBFF',
      padding: 10,
      borderRadius:15,
      width: 90,
      margin:10,
      border: 2,
      borderStyle: 'solid',
      borderColor: 'black',
      color: 'black',
      fontSize: 10,
      paddingRight: 5,
      height: 40
    }
  });

  export default styles;