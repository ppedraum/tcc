import { React, useContext, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import base64 from 'react-native-base64';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';

import Comentarios from './Comentarios';
import { CommProvider } from '../../contexts/comentario';

    

function Publicacao({ route, navigation }){

    const [isLoading, setLoading] = useState(true);
    const [publicacao, setPublicacao] = useState([]);
    const [fotoPublicacao, setFotoPublicacao] = useState('');
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
            setPublicacao(result.publicacao);

            if(result.foto_publicacao != null){
                const foto = result.foto_publicacao.foto;
                setFotoPublicacao('data:image/jpeg;base64,'+foto);
            }
                
            verLike(result.publicacao.id, usuario.id);
            getInstById(result.publicacao.id_ong);

            if(result.publicacao.tipo_publicacao == 'EVENTO'){
                getEventoById(result.publicacao.id_evento);
                verInscEvento(usuario.id, result.publicacao.id_evento);
                
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
            .then(res=>console.log('status insc' + res.status))
            .catch(err => console.log(err));

            /*
            Setar a inscricao ajuda a evitar erros como mandar duas requisicoes de follow
            quando ja esta seguindo e dar erro no sistema.
            */
            setInscrito(true);
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
            setMsgEvento('Você já está inscrito para esse evento.');
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

        let abortController = new AbortController();

        getPublicacaoById();

        return ()=> abortController.abort();

    }, []);

    return (
        <View style={styles.containerpub}>

            {
            isLoading ? <ActivityIndicator size='large' color='white'/>
            :
            <ScrollView>  
                <View style={styles.alinharmeio}>
                    <View style={styles.filtros_container} >
                        <Text style={styles.titulo}>Por: </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('PerfilInst', {id : inst.id})}>
                            <Text style={styles.titulo}>{inst.nome_fantasia}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        fotoPublicacao != '' ?
                        <Image source={{ uri: fotoPublicacao }} style={{ width: 300, height: 300 }}/>
                        :
                        null
                    }
                    <Text style={styles.titulo}>{publicacao.titulo} </Text>
                    <Text style={styles.conteudo}>{publicacao.descricao} </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={isLiked? unlike : like}>
                            {   
                                isLiked ?
                                <Ionicons style={styles.likepubY}
                                name='heart'
                                size={45}
                                />
                                :
                                <Ionicons style={styles.likepubN}
                                name='heart-outline'
                                size={45}
                                />
                            }   
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
                                <View style={styles.containeraviso} >
                                    <Text style={styles.conteudo}>
                                        O nosso app pega as informações recebidas por você para fazer uma inscrição
                                        rápida e, ao clicar em 'Ciente', você concorda com nossos termos de uso.
                                    </Text>
                                    <Text style={styles.conteudo}>
                                        Seus dados irão para a instituição dona do evento, bom proveito!
                                    </Text>
                                    <View style={styles.filtros_container}>
                                    <TouchableOpacity style={styles.botao}
                                    onPress={handleInscricao}>
                                        <Text>Ciente</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botao}
                                    onPress={()=>setInscModalVisible(!inscModalVisible)}>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            <View>
                                <Text style={styles.titulo}>
                                    Detalhes do Evento
                                </Text>
                                <Text style={styles.conteudo}>
                                    <Text style={styles.conteudobold}>Endereço:</Text> {evento.endereco}
                                </Text>
                                <Text style={styles.conteudo}>
                                    <Text style={styles.conteudobold}>Cidade:</Text> {evento.cidade}
                                </Text>
                                <Text style={styles.conteudo}>
                                    <Text style={styles.conteudobold}>Estado:</Text> {evento.uf}
                                </Text>
                                <Text style={styles.conteudo}>

                                    {/*Ver certinho como formata essa bagaça*/}

                                    <Text style={styles.conteudobold}>Horário</Text> : {'\n'}
                                        <Text style={styles.conteudobold}>De</Text> {new Date(evento.datetime_inicio).toLocaleDateString()} <Text style={styles.conteudobold}>até</Text> {''}
                                        {new Date(evento.datetime_inicio).toLocaleTimeString()} {'\n'}
                                        
                                        <Text style={styles.conteudobold}>Até</Text> {new Date(evento.datetime_fim).toLocaleDateString()} <Text style={styles.conteudobold}>até</Text> {''}
                                        {new Date(evento.datetime_fim).toLocaleTimeString()} {'\n'}
                                        </Text>
                                    </View>

                                <TouchableOpacity style={isInscrito ? styles.botaoinscrito : styles.botaoinscrever}
                                onPress={handleInscModal} 
                                >
                                    {
                                        isInscrito ?
                                        <Text style={styles.botaotext2}>Inscrito</Text>
                                        :
                                        <Text style={styles.botaotext1}>Inscrever-se</Text>
                                    }
                                </TouchableOpacity>

                            <Text>{msgEvento}</Text>
                        </View>
                        )
                        :
                        null
                    }
                    </View>
                    <CommProvider>
                        <Comentarios id_publicacao={idPublicacao} />
                    </CommProvider>
                
            </ScrollView>
            }

        </View>
    );
}

export default Publicacao;