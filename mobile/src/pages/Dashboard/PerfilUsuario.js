import { React, useContext, useState, useEffect } from 'react'
import { Text, View, Image, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';
import { useIsFocused } from '@react-navigation/native';

import base64ArrayBuffer from '../../handy_tools/imgManipulation';

function PerfilUsuario({navigation}){

    const isFocused = useIsFocused();

    const { usuario, token, NODE_PORT, logout } = useContext(AuthContext);
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [ isLoading, setLoading ] = useState(true);
    const [follows, setFollows] = useState([]);

    function handleLogout(){
        logout();
    }

    function prepareImg(){
        const imgStr =  base64ArrayBuffer(usuario.foto_perfil) ;
        const base64Flag = 'data:image/png;base64,';

        setFotoPerfil(imgStr);

        console.log(fotoPerfil);
    }

    function getFollows(){
        setLoading(true);
        fetch( NODE_PORT + '/perfil/follows/' + usuario.id, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token} `
            }
        })
        .then(res=>res.json())
        .then(follows => setFollows(follows))
        .catch(err=>console.log(err))
        ;
        setLoading(false);
    }

    useEffect(()=>{
        getFollows();
        prepareImg();
    }, [isFocused])

    return (
        <View style={styles.container} >
            <Text>Olá {usuario.nome}!</Text>
            <Image source={{uri:fotoPerfil}} style={{width:50, height:50}} />
            {
            isLoading ? <ActivityIndicator size='large'/> :
            follows.length != 0?
            <FlatList 
                data={follows}
                keyExtractor={(item)=>item.id}
                renderItem={({item, index})=>
                <TouchableOpacity onPress={()=>navigation.navigate('PerfilInst', {id: item.id})} >
                    <Text style={styles.titulo} >{item.nome_fantasia}</Text>
                </TouchableOpacity>
                }
                refreshing={isLoading}
                onRefresh={getFollows}
            />
            :
            <Text>Você ainda não está seguindo nenhuma instituição!</Text>
            }
        </View>
    )

}

export default PerfilUsuario;
