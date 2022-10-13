import { React, useState, useContext, useEffect } from 'react';
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
        console.log(`refresh antes do getComentarios ` + refresh);
        toRefresh();
        console.log(`refresh dps do getComentarios ` + refresh);
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
        .then(res => res.json())
        .then(res => {
            console.log(res);
            toRefresh();
            setDelDialogVisible(false);
        })
        .catch(err => console.log(err));
        
    }

    function HandleComentarios(){
        const filhos = comentarios.filter(comentario=>comentario.id_pai != null).sort((a, b) => a.datetime_post - b.datetime_post >= 0);
        const pais = comentarios.filter(comentario=>comentario.id_pai == null).sort((a, b) => a.datetime_post - b.datetime_post >= 0);
        return pais.map((commPai)=>(
            <View key={commPai.id} style={styles.post_cell} >
                <Text>
                    {new Date(commPai.datetime_post).toLocaleDateString()} {'- '}
                    {new Date(commPai.datetime_post).toLocaleTimeString()}
                </Text>
                <Text style={styles.conteudo}>{commPai.conteudo}</Text>
                <FormComentario id_publicacao={id_publicacao} id_pai={commPai.id} tipo='icon' />
                {
                    commPai.id_usuario == usuario.id ? 
                    <>
                    <Dialog.Container visible={delDialogVisible}>
                        <Dialog.Title>Deletar Publicacao</Dialog.Title>
                        <Dialog.Description>Voce realmente quer deletar essa publicacao?</Dialog.Description>
                        <Dialog.Button label='Sim' onPress={()=>deleteComentario(commPai.id)} />
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
                        if(commFilho.id_pai == commPai.id)
                            return(
                                <View key={commFilho.id} >
                                    <Text>
                                        {new Date(commFilho.datetime_post).toLocaleDateString()} {'- '}
                                        {new Date(commFilho.datetime_post).toLocaleTimeString()}
                                    </Text>
                                    <Text style={styles.conteudo} >{commFilho.conteudo}</Text>
                                {
                                    commFilho.id_usuario == usuario.id ? 
                                    <>
                                    <Dialog.Container visible={delDialogVisible}>
                                        <Dialog.Title>Deletar Publicacao</Dialog.Title>
                                        <Dialog.Description>Voce realmente quer deletar essa publicacao?</Dialog.Description>
                                        <Dialog.Button label='Sim' onPress={()=>deleteComentario(commFilho.id)} />
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

    useEffect(()=>{getComentarios()}, [/* refresh */]);

/*     function handleComentarios(){
        const filhos = comentarios.filter(comentario=>comentario)
    } */

    return (
        <View>
            <View>
                <FormComentario id_publicacao={id_publicacao} id_pai={null} tipo='textinput' />
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