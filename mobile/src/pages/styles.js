import {React} from 'react';
import {StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
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
        backgroundColor: '#fff',
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
      fontSize : 30
    },
    titulo_galeria:{
      fontWeight : 'bold',
      fontSize : 15
    },
    conteudo:{
      fontSize : 20
    },
    conteudo_galeria:{
      fontSize : 15
    },
    input:{
        width : 200,
        height: 40,
        padding : 10,
        margin : 10,
        borderRadius: 15,
        backgroundColor: '#d7d7d7',
    },
    pickerInput:{
        width : 200,
        height: 30,
        padding : 10,
        margin : 10,
        backgroundColor: '#99B3FF',
        color: 'white',
        borderWidth: 1,
        borderColor: 'blue'

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
    foto_perfil:{
      width:200,
      height:200,
      marginVertical:20,
    },
    foto_galeria:{
      width:150,
      height:150,
    }
  });

  export default styles;