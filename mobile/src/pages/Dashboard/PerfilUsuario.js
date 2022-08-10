import { React, useContext } from 'react'
import { Text, View, Button } from 'react-native';

import AuthContext from '../../contexts/auth';

function PerfilUsuario(){

    const { usuario, logout } = useContext(AuthContext);

    function handleLogout(){
        logout();
    }

    return (
        <View>
            <Text>Olá, {usuario.nome} !</Text>
            <Button onPress={()=>{handleLogout()}} title='logout' />
        </View>
    )

}

export default PerfilUsuario;
