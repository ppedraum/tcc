import { React, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../styles';

import AuthContext from '../../contexts/auth';



function Publicacao({ route, navigation }){

    const [publicacao, setPublicacao] = useState([]);

    const { token } = useContext(AuthContext);

    const idPublicacao = JSON.stringify(route.params.id);

    function getPublicacaoById(){
        fetch('http://10.107.0.33:3001/projeto/publicacao/'+ idPublicacao, {
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
            
        })
        .then(res => res.json())
        .then(result => {
            setPublicacao(result);
            //console.log(publicacao);
            
        })
        .catch(err => console.log(err));
    }
    
    useEffect(()=>{
        getPublicacaoById()
    }, [token]);

    return (
        <>
        <View style={styles.container} >
            <Text style={styles.titulo}>{publicacao.titulo} </Text>
            <Text style={styles.conteudo}>{publicacao.descricao} </Text>
        </View>
        </>
    );
}

export default Publicacao;