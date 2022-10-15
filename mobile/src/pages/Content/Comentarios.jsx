import { React, useState, useContext, useEffect,  } from 'react';
import { Text, View, Button, Modal } from 'react-native';
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
        }
        toRefresh();
        getComentarios();
        
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
    }

    function HandleComentarios(){
        const filhos = comentarios.filter(comentario=>comentario.estrutura.id_pai != null)
                       .sort((a, b) => a.estrutura.datetime_post - b.estrutura.datetime_post >= 0);
        const pais = comentarios.filter(comentario=>comentario.estrutura.id_pai == null)
                       .sort((a, b) => a.estrutura.datetime_post - b.estrutura.datetime_post >= 0);
        return pais.map((commPai)=>(
            <View key={commPai.estrutura.id} style={styles.post_cell} >
                <Text>
                    {commPai.nome_usuario + ': ' }
                    {new Date(commPai.estrutura.datetime_post).toLocaleDateString() + ' - '}
                    {new Date(commPai.estrutura.datetime_post).toLocaleTimeString()}
                </Text>
                <Text style={styles.conteudo}>{commPai.estrutura.conteudo}</Text>
                <FormComentario onComentar={comentar} tipo='icon' id_pai={commPai.estrutura.id} />
                {
                    commPai.estrutura.id_usuario == usuario.id ? 
                    <>
                    <Dialog.Container visible={delDialogVisible}>
                        <Dialog.Title>Deletar Publicacao</Dialog.Title>
                        <Dialog.Description>Voce realmente quer deletar essa publicacao?</Dialog.Description>
                        <Dialog.Button label='Sim' onPress={()=>deleteComentario(commPai.estrutura.id)} />
                        <Dialog.Button label='Nao' onPress={()=>setDelDialogVisible(false)} />
                    </Dialog.Container>
                    <Button title='Deletar' onPress={()=>setDelDialogVisible(true)}/>
                    </>
                    :
                    null
                }
                <View style={{marginLeft:20}} >
                {
                    filhos.map(commFilho=>{
                        if(commFilho.estrutura.id_pai == commPai.estrutura.id)
                            return(
                                <View key={commFilho.estrutura.id} >
                                    <Text>
                                        {commFilho.nome_usuario} {'- '}
                                        {new Date(commFilho.estrutura.datetime_post).toLocaleDateString() + ' - ' }
                                        {new Date(commFilho.estrutura.datetime_post).toLocaleTimeString()}
                                    </Text>
                                    <Text style={styles.conteudo} >{commFilho.estrutura.conteudo}</Text>
                                {
                                    commFilho.estrutura.id_usuario == usuario.id ? 
                                    <>
                                    <Dialog.Container visible={delDialogVisible}>
                                        <Dialog.Title>Deletar Publicacao</Dialog.Title>
                                        <Dialog.Description>Voce realmente quer deletar essa publicacao?</Dialog.Description>
                                        <Dialog.Button label='Sim' onPress={()=>deleteComentario(commFilho.estrutura.id)} />
                                        <Dialog.Button label='Nao' onPress={()=>setDelDialogVisible(false)} />
                                    </Dialog.Container>
                                    <Button title='Deletar' onPress={()=>setDelDialogVisible(true)}/>
                                    </>
                                    :
                                    null
                                }
                                
                                </View>
                            )
                    })
                }
                </View>
            </View>
        ));
    }

    useEffect(()=>{getComentarios()}, [refresh]);

/*     function handleComentarios(){
        const filhos = comentarios.filter(comentario=>comentario)
    } */

    return (
        <View>
            <View>
                <FormComentario onComentar={comentar} tipo='textinput' id_pai={null} />
                <Text style={styles.titulo} >Comentários</Text>
            </View>
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