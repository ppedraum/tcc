import { React, useContext } from 'react'
import { Text, View, Button } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';

function PerfilUsuario(){

    const { usuario, token, NODE_PORT, logout } = useContext(AuthContext);

    function handleLogout(){
        logout();
    }

    function getInscricoes(){
        fetch( NODE_PORT + '/perfil/inscricoes', {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token} `
            }
        })
        .then(res=>res.json())
        .then(inscricoes => console.log(inscricoes))
        ;
    }

    return (
        <View style={styles.container} >
            <View style={{alignSelf:'center'}} >
                <Text>Olá, {usuario.nome} !</Text>
            </View>
            <View>
                <Button onPress={()=>{handleLogout()}} title='logout' />
                <Button onPress={getInscricoes} title='balblalb'/>
            </View>
        </View>
    )

}

export default PerfilUsuario;
