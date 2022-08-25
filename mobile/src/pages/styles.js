import {React} from 'react';
import {StyleSheet} from 'react-native';

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
    conteudo:{
      fontSize : 20
    },
    input:{
        width : 200,
        height: 40,
        padding : 10,
        margin : 10,
        borderWidth: 1,
        borderColor: 'blue'
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
    }
  });

  export default styles;