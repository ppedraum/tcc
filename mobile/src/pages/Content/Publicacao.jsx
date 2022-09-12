import { React, useContext, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

import Comentarios from './Comentarios';

import AuthContext from '../../contexts/auth';
import { CommProvider } from '../../contexts/comentario';



function Publicacao({ route, navigation }){

    const [isLoading, setLoading] = useState(true);
    const [publicacao, setPublicacao] = useState([]);
    const [inst, setInst] = useState([]);
    const [evento, setEvento] = useState([]);
    const [msgEvento, setMsgEvento] = useState('');
    const [inscModalVisible, setInscModalVisible] = useState(false);

    const [isInscrito, setInscrito] = useState(true);
    const [isLiked, setLiked] = useState(true);

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
            verLike(result.id, usuario.id);
            getInstById(result.id_ong);
            if(result.tipo_publicacao == 'EVENTO'){
                getEventoById(result.id_evento);
                verInscEvento(usuario.id, result.id_evento);
                
            }
            setTimeout(()=>{setLoading(false)}, 200)
        })
        .catch(err => console.log(err));
        
    }

    function getInstById(id){
        fetch(NODE_PORT + '/projeto/instituicao/' + id, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(inst => setInst(inst))
    }

    function verInscEvento(id_usuario, id_evento){
        fetch( NODE_PORT + '/inscricoes/ver_evento/' + id_usuario + '/' + id_evento, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            },
        } )
        .then(res => res.json())
        .then(result => setInscrito(result.ver))
        .catch(err => console.log(err))
    }

    function getEventoById(id){
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

/*     function cancelInscricao(){
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
    } */

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
    //Sempre quando manda algo pra rede tem que botar em JSONNNN
    function like(){
        
        fetch(NODE_PORT + '/postinteraction/like', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                id_publicacao : publicacao.id,
                id_usuario : usuario.id
            })
        })
        .then(res => {
            console.log('Status like: ' + res.status);
            setLiked(true);
        })
        .catch(err => console.log('like erro: ' + err));
        
    }

    function unlike(){
        fetch(NODE_PORT + '/postinteraction/like', {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({
                id_publicacao : publicacao.id,
                id_usuario : usuario.id
            })
        })
        .then(res => {
            console.log('Status unlike: ' + res.status);
            setLiked(false);
        })
        .catch(err => console.log('unlike erro: ' + err));
    }

    function verLike(id_publicacao, id_usuario){
        fetch(NODE_PORT + '/postinteraction/ver_like/' + id_publicacao + '/' + id_usuario , {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(result => setLiked(result.ver))
        .catch(err => console.log('verLike erro: ' + err));
    }

    useEffect(()=>{
        getPublicacaoById();
    }, []);

    return (
        <ScrollView>
        <View style={styles.container} >
        {
        isLoading ? <ActivityIndicator size='large' color='blue'/>
        :
        <>  
            <View style={styles.filtros_container} >
                <Text style={styles.titulo}>Por: </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('PerfilInst', {id : inst.id})}>
                    <Text style={styles.titulo}>{inst.nome_fantasia}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.titulo}>{publicacao.titulo} </Text>
            <Text style={styles.conteudo}>{publicacao.descricao} </Text>
            <TouchableOpacity onPress={isLiked? unlike : like}>
                <Ionicons name='thumbs-up' size={24} color={isLiked? '#4490F5' : '#666'} />
            </TouchableOpacity>
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
            <CommProvider>
                <Comentarios id_publicacao={publicacao.id}/>
            </CommProvider>
        </>
        }
        </View>
        </ScrollView>
    );
}

export default Publicacao;