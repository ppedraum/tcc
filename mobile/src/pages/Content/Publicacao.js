import { React, useContext, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';



function Publicacao({ route, navigation }){

    const [isLoading, setLoading] = useState(true);
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
            if(result.tipo_publicacao == 'EVENTO'){
                getEventoById(result.id_evento);
                verInscEvento(usuario.id, result.id_evento);
                
            }
            setLoading(false);
        })
        .catch(err => console.log(err));
        
    }

    function verInscEvento(id_usuario, id_evento){
        fetch( NODE_PORT + '/inscricoes/ver_evento/' + id_usuario + '/' + id_evento, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            },
        } )
        .then(res => res.json())
        .then(result => {
            console.log('Inscrito? ' + result.ver);
            console.log('Id do usuário : ' + usuario.id);
            console.log('id do evento : ' + id_evento);
            setInscrito(result.ver);
        })
        .catch(err => alert(err))
    }

    function getEventoById(id){
        console.log(id)
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
        if(!isInscrito)
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
            .catch(err => setMsgEvento('Houve um problema na inscrição.'));

        else setMsgEvento('Você já se inscreveu!');
        getPublicacaoById();
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
        isLoading ? <ActivityIndicator size='large' color='blue'/>
        :
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
                    <Button disabled={isInscrito} title={isInscrito?'Inscrito':'Inscrever-se'} onPress={inscrever} />
                    <Text>{msgEvento}</Text>
                </View>
                )
                :
                null
            }
            
        </View>
    );
}

export default Publicacao;