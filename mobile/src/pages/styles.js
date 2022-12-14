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
      color: 'white',
      marginBottom: 30,
    },
    titulo_galeria:{
      fontWeight : 'bold',
      color: 'white',
      fontSize : 15
    },
    conteudo:{
      color: 'white',
      fontSize : 20
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
        height: 45,
        padding : 10,
        margin : 10,
        borderRadius: 15,
        backgroundColor: '#FAFAFA',
        fontSize : 20
    },
    pickerInput:{
        width : 200,
        height: 20,
        padding : 10,
        margin : 10,
        backgroundColor: '#99B3FF',
        color: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 15,
    },
    searchContainer:{
        display: 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor: '#FFF',
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
    containerLogo:{
      flex:1,
      justifyContent: 'center',
      backgroundColor: 'red',
      width:10,
      height:10,
    },
    botao:{
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius:15,
      width: 100,
      margin:10,
      border: 2,
      borderStyle: 'solid',
      borderColor: 'black',
    },
    bt_label:{
      fontSize : 20
    }
  });

  export default styles;