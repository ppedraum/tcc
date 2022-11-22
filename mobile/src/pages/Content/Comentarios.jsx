import { React, useState, useContext, useEffect,  } from 'react';
import { Text, View, Button, Modal, Image, TouchableOpacity, Touchable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormComentario from './FormComentario';
import Dialog from 'react-native-dialog';
import AuthContext from '../../contexts/auth';
import CommContext from '../../contexts/comentario';
import styles from '../styles';

function Comentarios({id_publicacao}){

    const { NODE_PORT, token, usuario } = useContext(AuthContext);
    const { refresh, toRefresh, stopRefresh } = useContext(CommContext);
    const [comentarios, setComentarios] = useState([]);
    const [delDialogVisible, setDelDialogVisible] = useState(false);

    {/* O comentário selecionado para deleção */}
    const [commSelecionado, setCommselecionado] = useState([]);

    function getComentarios(){
        fetch(NODE_PORT + '/postinteraction/comentarios/' + id_publicacao, {
            method:'GET',
            headers:{Authorization: `Bearer ${token}`}
        })
        .then(res=>res.json())
        .then(comentarios=>setComentarios(comentarios))
        .catch(err => console.log(err));
        stopRefresh();
    }
    
    function comentar(texto, id_pai){
        /*Tomar cuidado para colocar tudo dentro do if, para nao causar problemas de promise*/
        if(texto.trim() !=0){
            fetch(NODE_PORT + '/postinteraction/comentarios', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`,
                },
                body:JSON.stringify({
                    conteudo: texto,
                    id_publicacao: id_publicacao,
                    id_usuario: usuario.id,
                    id_pai: id_pai
                })
            })
            .then(res=>{
                console.log('Status do post comentario: ' + res.status)
                
            })
            .catch(err => {
                console.log(err)
            });
            toRefresh();
            {/* Toda vez que fazemos uma alteração, atualizamos os comentários */}
            getComentarios();
        }
        
    }

    function deleteComentario(id_comentario){
        console.log('Id do usuario : ' + usuario.id);
        console.log('Id do comentario : ' + id_comentario);
        fetch(NODE_PORT + '/postinteraction/comentarios',{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
            body:JSON.stringify({
                id : id_comentario,
                id_usuario: usuario.id
            })
        })
        .then(res => console.log('Status da delecao: ' + res.status))
        .catch(err => console.log(err));
        toRefresh();
        setDelDialogVisible(false);
    }

    function HandleComentarios(){

        {/* 
        Filtramos os comentários entreÇ
        1. Os que possuem um id_pai (filhos de um comentário)
        2. Os que são comentários de primeira camada (pais) 
        */}
        const filhos = comentarios.filter(comentario=>comentario.estrutura.id_pai != null)
                       .sort((a, b) => a.estrutura.datetime_post - b.estrutura.datetime_post >= 0);
        const pais = comentarios.filter(comentario=>comentario.estrutura.id_pai == null)
                       .sort((a, b) => a.estrutura.datetime_post - b.estrutura.datetime_post >= 0);

        {/*
        Para cada pai, renderizamos ele e, se possuir filhos, renderizamos logo abaixo do pai
        */}
        
        return pais.map((commPai)=>(
            <View key={commPai.estrutura.id} style={styles.post_cell} >
                
                <View style={styles.header_comm} >
                    <Image source={{uri:'data:image/jpeg;base64,' + commPai.foto_perfil}} style={styles.foto_icon} />
                    {
                    /* Se o id_usuario do comentário for igual ao id do usuário logado, podemos deletar o comm */
                    commPai.estrutura.id_usuario == usuario.id ? 
                    <>
                    
                            
                    </>
                    :
                    null
                    }
                </View>
                <Text style={styles.nome_comm}>
                    {commPai.nome_usuario + ': ' }
                    {new Date(commPai.estrutura.datetime_post).toLocaleDateString()}
                    
                </Text>
               <View style={styles.filtros_container}>
                <Text style={styles.conteudo}>{commPai.estrutura.conteudo} 
                    <TouchableOpacity style={styles.arrumaicon}
                        onPress={()=>handleSetCommselecionado(commPai)}>
                        <Ionicons 
                        name='trash'
                        size={25}
                        color={'#fff'} 
                        />
                    </TouchableOpacity> </Text></View>
                <FormComentario onComentar={comentar} tipo='icon' id_pai={commPai.estrutura.id} />
                
                <View style={{marginLeft:20}} >
                {
                    filhos.map(commFilho=>{
                        if(commFilho.estrutura.id_pai == commPai.estrutura.id)
                            return(
                                <View key={commFilho.estrutura.id} >
                                    
                                    <View style={styles.header_comm} >
                                        <Image source={{uri:'data:image/jpeg;base64,' + commPai.foto_perfil}} style={styles.foto_icon} />
                                        {
                                            /* Se o id_usuario do comentário for igual ao id do usuário logado, podemos deletar o comm */
                                            commPai.estrutura.id_usuario == usuario.id ? 
                                            <>
                                            <TouchableOpacity
                                                onPress={()=>handleSetCommselecionado(commPai)}>
                                                <Ionicons 
                                                name='trash'
                                                size={25}
                                                color={'#fff'} 
                                                />
                                            </TouchableOpacity> 
                                                    
                                            </>
                                            :
                                            null
                                        }
                                    </View>
                                    <Text style={styles.nome_comm}>
                                        {commFilho.nome_usuario} {': '}
                                        {new Date(commFilho.estrutura.datetime_post).toLocaleDateString()}
                                    </Text>
                                    
                                    <Text style={styles.conteudo} >{commFilho.estrutura.conteudo}</Text>

                                
                                </View>
                            )
                    })
                }
                </View>
            </View>
        ));
    }

    function handleSetCommselecionado(comm){
        setCommselecionado(comm);
        setDelDialogVisible(true);
    }

    useEffect(()=>{getComentarios()}, [refresh]);




    return (
            <View style={styles.containercmt}>
                <Text style={styles.titulo} >Comentários</Text>
                <FormComentario onComentar={comentar} tipo='textinput' id_pai={null} />

                {/* Modal personalizada para podermos confirmar a deleção do comentário */}
                <Dialog.Container visible={delDialogVisible}>
                    <Dialog.Title>Deletar Comentário</Dialog.Title>
                    <Dialog.Description>Voce realmente quer deletar seu comentário ? </Dialog.Description>
                    <Dialog.Button label='Sim' onPress={()=>deleteComentario(commSelecionado.estrutura.id)} />
                    <Dialog.Button label='Nao' onPress={()=>setDelDialogVisible(false)} />
                </Dialog.Container>
                
            
            {
                comentarios.length != 0 ?
                <HandleComentarios/>
                :
                <Text style={styles.conteudo} >Ainda não há comentários para essa publicação.</Text>
            }
        </View>

    );

}

export default Comentarios;