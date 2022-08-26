import { React, useContext, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Modal } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';



function Publicacao({ route, navigation }){

    const [isLoading, setLoading] = useState(true);
    const [publicacao, setPublicacao] = useState([]);
    const [evento, setEvento] = useState([]);
    const [msgEvento, setMsgEvento] = useState('');
    const [inscModalVisible, setInscModalVisible] = useState(false);

    const [isInscrito, setInscrito] = useState(true);

    const { usuario, token, NODE_PORT } = useContext(AuthContext);

    const idPublicacao = JSON.stringify(route.params.id);

    function getPublicacaoById(){
        setLoading(true);
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
            setTimeout(()=>{setLoading(false)}, 200)
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

    function handleInscricao(){
        if(isInscrito)
            setMsgEvento('Você se Inscreveu! Para verificar as inscrições, vá para perfil/inscrições.')
        else
            inscrever();
            setInscModalVisible(!inscModalVisible);
    }

    function handleInscModal(){
        if(isInscrito){
            setMsgEvento('Você já está inscrito :D');
            setTimeout(()=>setMsgEvento(''), 5000);
        }
        else
            setInscModalVisible(true);
        
    }

    useEffect(()=>{
        getPublicacaoById();
    }, []);

    return (
        <View style={styles.container} >
        {
        isLoading ? <ActivityIndicator size='large' color='blue'/>
        :
        <>
            <Text style={styles.titulo}>{publicacao.titulo} </Text>
            <Text style={styles.conteudo}>{publicacao.descricao} </Text>
            {
                publicacao.tipo_publicacao == 'EVENTO' && publicacao.id_evento != null ?
                (
                <View>
                    <Modal
                    visible={inscModalVisible}
                    transparent={true}
                    animationType='fade'
                    onRequestClose={()=>setInscModalVisible(!inscModalVisible)}
                    >
                        <View style={styles.container} >
                            <Text style={styles.conteudo} >
                                O nosso app pega as informações recebidas por você para fazer uma inscrição
                                rápida e, ao clicar em 'Ciente', você concorda com nossos termos de uso.
                            </Text>
                            <Text style={styles.conteudo}>
                                Seus dados irão para a instituição dona do evento, bom proveito!
                            </Text>
                            <View style={styles.filtros_container}>
                            <Button title='Ciente' onPress={handleInscricao}/>
                            <Button title='Cancelar' onPress={()=>setInscModalVisible(!inscModalVisible)}/>
                            </View>
                        </View>
                    </Modal>
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
                    <Button color={isInscrito?'#bbb':'#6399FA' }
                    title={isInscrito?'Inscrito':'Inscrever-se'} 
                    onPress={handleInscModal} 
                    />

                    <Text>{msgEvento}</Text>
                </View>
                )
                :
                null
            }
        </>
        }
        </View>
    );
}

export default Publicacao;