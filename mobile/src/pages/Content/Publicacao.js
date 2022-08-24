import { React, useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';



function Publicacao({ route, navigation }){

    const [publicacao, setPublicacao] = useState([]);
    const [evento, setEvento] = useState([]);
    const [msgEvento, setMsgEvento] = useState('');

    const [isInscrito, setInscrito] = useState(true);

    const { usuario, token, NODE_PORT } = useContext(AuthContext);

    const idPublicacao = JSON.stringify(route.params.id);

    function getPublicacaoById(){
        fetch( NODE_PORT + '/projeto/publicacao/'+ idPublicacao, {
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
            
        })
        .then(res => res.json())
        .then(result => {
            setPublicacao(result);
            getEvento(result.id_evento)
            
        })
        .catch(err => console.log(err));
    }

    function verInscEvento(){
        fetch( NODE_PORT + '/inscricoes/ver_evento/' + usuario.id + '/' + publicacao.id_evento, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            },

        } )
        .then(res => res.json())
        .then(result => {
            console.log('Inscrito? ' + result.ver)
        })
        .catch(err => alert(err))
    }

    function getEvento(id){
        fetch( NODE_PORT + '/projeto/evento/' + id, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            }
        } )
        .then(res => res.json())
        .then(result => setEvento(result))
        .catch(err => console.log(err))
    }
    
    function inscrever(){
        fetch( NODE_PORT + '/inscricoes/evento', {
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
        .then(()=>setMsgEvento('Sucesso!'))
        .catch(err => setMsgEvento('Houve um problema na inscrição.'))
    }

    function cancelInscricao(){
        fetch( NODE_PORT + '/inscricoes/evento', {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}` 
            },
            body:{
                id_evento : publicacao.id_evento,
                id_usuario : usuario.id
            }
        } )
    }

    useEffect(()=>{
        getPublicacaoById();
    }, []);

    return (
        <>
        <View style={styles.container} >
            <Text style={styles.titulo}>{publicacao.titulo} </Text>
            <Text style={styles.conteudo}>{publicacao.descricao} </Text>
            {
                publicacao.tipo_publicacao == 'EVENTO' && publicacao.id_evento != null ?
                (
                <View>
                    <View>
                        <Text style={styles.titulo}>
                            Detalhes do Evento
                        </Text>
                        <Text style={styles.conteudo}>
                            Endereço: {evento.endereco}
                        </Text>
                        <Text style={styles.conteudo}>
                            Cidade: {evento.cidade}
                        </Text>
                        <Text style={styles.conteudo}>
                            Estado: {evento.uf}
                        </Text>
                        <Text style={styles.conteudo}>

                            {/*Ver certinho como formata essa bagaça*/}

                            Horário : {'\n'}
                            De {new Date(evento.datetime_inicio).toLocaleDateString()} às {''}
                            {new Date(evento.datetime_inicio).toLocaleTimeString()} {'\n'}
                            
                            Até {new Date(evento.datetime_fim).toLocaleDateString()} às {''}
                            {new Date(evento.datetime_fim).toLocaleTimeString()} {'\n'}

                        </Text>
                    </View>
                    <Button title='Inscrever-se' onPress={inscrever} />
                    <Text>{msgEvento}</Text>
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