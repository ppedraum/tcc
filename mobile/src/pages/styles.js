import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import {React} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

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
    containeraviso: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#004475',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 10
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
    containercmt: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#075F8C',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 0
    },
    containerpub: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#004475',

    },
    alinharmeio:{
      paddingLeft: 20,
      paddingRight: 20
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
      color:'white',
      backgroundColor:'#075F8C',
    },
    titulo:{
      fontWeight : 'bold',
      fontSize : 30,
      color:'white',
      paddingBottom:10,
      paddingTop:20
    },
    titulologin:{
      fontWeight : 'bold',
      fontSize : 30,
      color:'white',
      paddingBottom:40,
      paddingTop:10
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
      color: 'white',
      fontSize : 15
    },
    conteudo:{
      fontSize : 20,
      color:'white',
    },
    timelocal:{
      fontSize : 20,
      color:'white',
      paddingLeft: 20
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
    subtexto:{
      color: 'white',
      fontSize : 15
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
    inputcmt:{
        width: 200,
        height: 40,
        padding : 10,
        margin : 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        fontSize: 20,
        paddingBottom:10,
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
      height: 'auto',
      marginLeft: 30
    },
    flatlist_cell:{
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
      backgroundColor : '#0882A3',
      minWidth: 370,
      color: '#FFF'
    },
    flatlist_cell_evento:{
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
      backgroundColor : '#2B9972',
      minWidth: 370,
      color: '#FFF'
    },
    bt_desinscrever:{
      backgroundColor:'#2B703E'
    },
    foto_perfil:{
      width:200,
      height:200,
      marginVertical:20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo:{
      width: 190, 
      height: 60
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
    },
    botaoinscrever: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6399FA',
      padding: 10,
      borderRadius:15,
      margin:10,
      border: 2,
      borderStyle: 'solid',
      borderColor: 'black',
      fontSize: 10,
      height: 40,
      width: 150,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    botaotext1: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16
    },
    botaoinscrito: {
      alignItems: 'center',
      backgroundColor: '#bbb',
      padding: 10,
      borderRadius:15,
      width: 150,
      margin:10,
      border: 2,
      borderStyle: 'solid',
      borderColor: 'black',
      color: 'black',
      fontSize: 10,
      paddingRight: 5,
      height: 40,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    botaotext2: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16
    },
    botaocmt:{
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
  });

  export default styles;