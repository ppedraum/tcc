import { React, useContext } from 'react'
import { Text, View, Button } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';

function PerfilUsuario(){

    const { usuario, logout } = useContext(AuthContext);

    function handleLogout(){
        logout();
    }

    return (
        <View style={styles.container} >
            <View style={{alignSelf:'center'}} >
                <Text>Olá, {usuario.nome} !</Text>
            </View>
            <View>
                <Button onPress={()=>{handleLogout()}} title='logout' />
            </View>
        </View>
    )

}

export default PerfilUsuario;
