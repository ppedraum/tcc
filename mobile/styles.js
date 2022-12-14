import {React} from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    post_cell:{
      display: 'flex',
      alignItems: 'flex-start',
      margin: '10px',
  
    },
    titulo:{
      fontWeight : 'bold',
      fontSize : '30px'
    },
    conteudo:{
      fontSize : '20px'
    },
    input:{
        width : '100%',
        height: '30px',
        padding : '10px',
        margin : '10px',
        border : '1px solid',
        borderColor : 'black'
    },
    searchContainer:{
        display: 'flex',
        flexDirection : 'row',
        alignItems : 'center',
    }
  });

  export default styles;