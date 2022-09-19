import { React, useContext, useState, useEffect } from 'react'
import { Text, View, Image, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';

var Buffer = require('@craftzdog/react-native-buffer').Buffer;

import AuthContext from '../../contexts/auth';
import { useIsFocused } from '@react-navigation/native';

import {decode as atob, encode as btoa} from 'base-64';
import arrayBufferToBase64 from '../../handy_tools/imgManipulation';

function PerfilUsuario({navigation}){

    const isFocused = useIsFocused();

    const { usuario, token, NODE_PORT, logout } = useContext(AuthContext);
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [ isLoading, setLoading ] = useState(true);
    const [follows, setFollows] = useState([]);

    function handleLogout(){
        logout();
    }

    /* const arrayBufferToBase64 = buffer => {
        let binary;
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
          console.log(binary);
        }
        return btoa(binary);
      }; */

    /* function prepareImg(){
        const imageBuffer = Buffer.from(JSON.stringify(usuario.foto_perfil))
        const imgFlag = 'data:image/jpeg;base64,'
        const imageBase64 = imageBuffer.toString('base64')
        setFotoPerfil(imageBase64);
        console.log(fotoPerfil);
    } */

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
        //console.log( 'Buffer : ' + arrayBufferToBase64(usuario.foto_perfil));
    }, [isFocused])

    return (
        <View style={styles.container} >
            {/* <Text>Olá {usuario.nome}!</Text> */}
            <Button title='Logout' onPress={logout}/>
            {/* 
            <Image source={{
                  uri:
                    'data:image/jpg;base64,' + arrayBufferToBase64(usuario.foto_perfil)
                     //data.data in your case
                }} 
                style={{width:200, height:200}} 
            /> 
            */}
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
