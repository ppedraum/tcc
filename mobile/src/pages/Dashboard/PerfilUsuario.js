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
        fetch( NODE_PORT + '/perfil/follows', {
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
                <Text style={styles.titulo}>Dados Pessoais</Text>
                <Text>E-Mail : {usuario.e_mail}</Text>
                <Text>Telefone : {usuario.telefone}</Text>
                <Text>Cidade : {usuario.cidade}, {usuario.uf}</Text>
                <Text>Profissão Atual : {usuario.profissao}</Text>
            </View>
            <View>
                <Button title='Torne-se Voluntário'/>
                <Button onPress={()=>{handleLogout()}} title='logout' />
                {/* <Button onPress={getInscricoes} title='Pegar Inscrições'/> */}
            </View>
        </View>
    )

}

export default PerfilUsuario;
