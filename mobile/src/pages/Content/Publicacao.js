import { React, useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';



function Publicacao({ route, navigation }){

    const [publicacao, setPublicacao] = useState([]);
    const [msg, setMsg] = useState('');
    const { usuario, token } = useContext(AuthContext);

    const idPublicacao = JSON.stringify(route.params.id);

    function getPublicacaoById(){
        fetch('http://192.168.0.111:3001/projeto/publicacao/'+ idPublicacao, {
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
            
        })
        .then(res => res.json())
        .then(result => {
            setPublicacao(result);
            
        })
        .catch(err => console.log(err));
    }
    
    useEffect(()=>{
        getPublicacaoById()
    }, [token]);

    function inscrever(){
        fetch('http://192.168.0.111:3001/inscricoes/evento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                id_evento : publicacao.id_evento,
                id_usuario : usuario.id
            })
        })
        .then(()=>console.log('chegou aqui'))
        .catch(err => console.log(err))
    }


    return (
        <>
        <View style={styles.container} >
            <Text style={styles.titulo}>{publicacao.titulo} </Text>
            <Text style={styles.conteudo}>{publicacao.descricao} </Text>
            {
                publicacao.tipo_publicacao == 'EVENTO' && publicacao.id_evento != null ?
                (
                <View>
                <Button title='Inscrever-se' onPress={inscrever} />
                </View>
                )
                :
                null
            }
            
        </View>
        </>
    );
}

export default Publicacao;