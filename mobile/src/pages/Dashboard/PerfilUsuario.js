import { React, useContext, useState, useEffect } from 'react'
import { Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';

function PerfilUsuario({navigation}){

    const { usuario, token, NODE_PORT, logout } = useContext(AuthContext);
    const [follows, setFollows] = useState([]);

    function handleLogout(){
        logout();
    }

    function getFollows(){
        fetch( NODE_PORT + '/perfil/follows/' + usuario.id, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token} `
            }
        })
        .then(res=>res.json())
        .then(follows => setFollows(follows))
        .catch(err=>alert(err))
        ;
    }

    useEffect(()=>{
        getFollows();
    }, [follows])

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
            <View style={styles.filtros_container} >
                <Button onPress={()=>{handleLogout()}} title='logout' />
                
            </View>
            <Text style={styles.titulo} >Instituições Seguidas</Text>
            {
            follows.length != 0?
            <FlatList 
                data={follows}
                keyExtractor={(item)=>item.id}
                renderItem={({item, index})=>
                <TouchableOpacity onPress={()=>navigation.navigate('PerfilInst', {id: item.id})} >
                    <Text style={styles.titulo} >{item.nome_fantasia}</Text>
                </TouchableOpacity>
                }
            />
            :
            <Text>Você ainda não está seguindo nenhuma instituição!</Text>
            }
        </View>
    )

}

export default PerfilUsuario;
