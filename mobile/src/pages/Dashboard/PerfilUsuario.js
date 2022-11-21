import { React, useContext, useState, useEffect } from 'react'
import { Text, View, Image, Button, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles';

import AuthContext from '../../contexts/auth';
import { useIsFocused } from '@react-navigation/native';

function PerfilUsuario({navigation}){

    const isFocused = useIsFocused();

    const { usuario, token, NODE_PORT, logout } = useContext(AuthContext);
    const [ isLoading, setLoading ] = useState(true);
    const [follows, setFollows] = useState([]);

    function handleLogout(){
        logout();
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

    function HandleFollowsRender(){
        return(
            follows.map(follow =>(
                <TouchableOpacity key={follow.id} onPress={()=>navigation.navigate('PerfilInst', {id: follow.id})} >
                    <View style={styles.flatlist_cell} >
                        <Text style={styles.titulo} >{follow.nome_fantasia}</Text>
                    </View>
                </TouchableOpacity>
            ))
        );

    }

    useEffect(()=>{
        if(isFocused)
            getFollows();
        //console.log( 'Buffer : ' + arrayBufferToBase64(usuario.foto_perfil));
    }, [isFocused])

    return isLoading ? <ActivityIndicator size='large'/> :
        
        
        <View style={styles.container} >
            <ScrollView contentContainerStyle={styles.container} >
                <TouchableOpacity onPress={()=>navigation.navigate('EditarPerfil')}>
                    <MaterialCommunityIcons 
                    name='account-edit-outline' 
                    size={60}
                    color='white' 
                    />
                </TouchableOpacity>
                <Image source={{uri:"data:image/jpeg;base64," + usuario.foto_perfil}} style={styles.foto_perfil} />
                <Text style={styles.conteudo}><Text style={styles.conteudobold}>Olá</Text> {usuario.nome} !</Text>
                <Text style={styles.titulo}>Dados Básicos</Text>
                <Text style={styles.conteudo}><Text style={styles.conteudobold}>E-Mail :</Text> {usuario.e_mail}</Text>
                <Text style={styles.conteudo}><Text style={styles.conteudobold}>Telefone :</Text> {usuario.telefone}</Text>
                <Text style={styles.conteudo}><Text style={styles.conteudobold}>Profissão :</Text> {usuario.profissao}</Text>
                <Text style={styles.titulo}>Instituições Seguidas</Text>
                {
                follows.length != 0?
                <HandleFollowsRender/>
                :
                <Text>Você ainda não está seguindo nenhuma instituição!</Text>
                }
                <TouchableOpacity onPress={logout}>
                    <MaterialCommunityIcons 
                        name='logout' 
                        size={50}
                        color='white' 
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
        
        

}

export default PerfilUsuario;
