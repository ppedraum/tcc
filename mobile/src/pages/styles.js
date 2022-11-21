import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import {React} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#004475',
      width: '100%',
      paddingTop: 30,
      height: Dimensions.get('window').height,
      alignItems: 'center',
    },
    containerlogin: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#004475',
      width: '100%',
      paddingTop: 150,
      height: Dimensions.get('window').height,
      alignItems: 'center',
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
    containerpinst: {
      display: 'flex',
      flexDirection: 'column',
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
    },
    containerpub: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#004475',

    },
    alinharmeio:{
      display: 'flex',
      alignItems: 'center',
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
      margin: 10,
      color:'white',
    },
    titulo:{
      fontWeight : 'bold',
      fontSize : 30,
      color:'white',
      paddingBottom:10,
      paddingTop:10
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
    logo:{
      width: 190, 
      height: 60
    },
    titulocontainer: {
      display:'flex',
      alignItems:'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: '#004475',
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
    pickerInputperfil:{
        width : Dimensions.get('window').width * 0.7,
        height: 20,
        padding : 10,
        margin : 10,
        backgroundColor: '#0882A3',
        color: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: '50%'
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
    galeria:{
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "row",
      flexWrap: "wrap",
      width: Dimensions.get('window').width
    },
    titulo_galeria:{
      fontWeight : 'bold',
      fontSize : 15
    },
    galeria_cell:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#4490F5',
        width: Dimensions.get('window').width * 0.30,
        height: Dimensions.get('window').width * 0.30,
        margin: 6
    },
    flatlist_cell:{
      display: "flex",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginVertical: 5,
      backgroundColor : '#0882A3',
      minWidth: 370,
      color: '#FFF'
    },
    flatlist_cell_evento:{
      display: "flex",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginVertical: 5,
      backgroundColor : '#2B9972',
      minWidth: 370,
      color: '#FFF'
    },
    flatlist_text:{
      width: 300,
      display: "flex",
      alignItems: "flex-start",
    },
    bt_desinscrever:{
      backgroundColor:'#2B703E'
    },
    foto_perfil:{
      width:200,
      height:200,
      borderRadius: 100,
      marginVertical:20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    foto_icon:{
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    foto_publicacao:{
      width:300,
      height:300,
      marginVertical:20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      width: 190, 
      height: 60
    },
    foto_galeria:{
      width: Dimensions.get('window').width * 0.30,
      height: Dimensions.get('window').width * 0.30,
    },
    sanfona:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
      backgroundColor : '#0882A3',
      width: Dimensions.get('window').width - 20,
      borderRadius: 15
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
      fontSize: 16,
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
    botaoseguindo: {
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
    botaoseguir: {
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
    likepubY:{
      color: '#E10B00',
      paddingLeft: 20
    },
    likepubN:{
      color: 'black',
      paddingLeft: 20
    },
  });

  export default styles;