import { React, useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity, Button, Modal, Image } from 'react-native'
import AuthContext from '../../contexts/auth';
import styles from '../styles';



function PerfilInst({route, navigation}){

    const [isLoading, setLoading] = useState(true);
    const [inst, setInst] = useState([]);
    const [isFollowing, setFollowing] = useState(true);
    const [msgFollow, setMsgFollow] = useState('');
    const [folModalVisible, setFolModalVisible] = useState(false);

    const [galeria, setGaleria] = useState([]);
    const { token, usuario, NODE_PORT } = useContext(AuthContext)

    function getPerfilById(){
        setLoading(true);
        fetch( NODE_PORT + '/projeto/instituicao/' + route.params.id, {
            method : 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(inst => {
            setInst(inst);
            verFollow(inst.id, usuario.id);
            //console.log(inst.id)
            //console.log(usuario.id)
        })
        .catch(err => console.log(err))
        getPublicacoesInst();
        setTimeout(()=>{setLoading(false)}, 200);
    }

    function getPublicacoesInst(){
        fetch( NODE_PORT + '/projeto/galeria/' + route.params.id, {
            method : 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(galeria => setGaleria(galeria))
        .catch(err => console.log(err))
        console.log(galeria)
    }

    function verFollow(id_inst, id_usuario){
        fetch( NODE_PORT + '/inscricoes/ver_follow/' + id_inst + '/' + id_usuario, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            },
        } )
        .then(res => res.json())
        .then(result => {
            /* console.log('Follow? ' + result.ver); */
            setFollowing(result.ver);
        })
        .catch(err => alert(err))
    }

    function unfollow(){
        fetch( NODE_PORT + '/inscricoes/inst', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                id_inst : inst.id,
                id_usuario : usuario.id
            })
        })
        .then(()=>console.log('Unfollow Sucesso!'))
        .catch(err => console.log('Houve um problema no Unfollow.'));
        
        setMsgFollow('Você parou de seguir ' + inst.nome_fantasia + '.'  );
        getPerfilById();
        setTimeout(()=>{setMsgFollow('')}, 5000);
    }

    function follow(){
        fetch( NODE_PORT + '/inscricoes/inst', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                id_inst : inst.id,
                id_usuario : usuario.id
            })
        })
        .then(()=>console.log('Follow Sucesso!'))
        .catch(err => console.log('Houve um problema no Follow.'));
        
        setMsgFollow('Você está seguindo ' + inst.nome_fantasia + '!'  );
        getPerfilById();
        setTimeout(()=>{setMsgFollow('')}, 5000);
    }

    function handleFollow(){
        if(isFollowing)
            unfollow();
        
        else
            follow(); 
        
        setFolModalVisible(!folModalVisible);
    }

    useEffect(()=>{
        getPerfilById();
    }, [])

    return(
        <View style={styles.container} >
        {
            isLoading ? <ActivityIndicator size='large' color='blue'/>
            :
            <View>
                <Modal
                visible={folModalVisible}
                transparent={true}
                animationType='fade'
                onRequestClose={()=>setFolModalVisible(!folModalVisible)}
                >
                    <View style={styles.container}>
                        <Text>
                            {isFollowing?
                            'Você tem certeza que deseja parar de seguir?'
                            :
                            'Você quer seguir essa instituição?'
                            }
                        </Text>
                        <View  style={styles.filtros_container}>
                            <Button onPress={handleFollow} title='Sim' />
                            <Button onPress={()=>setFolModalVisible(!folModalVisible)} title='Não' />
                        </View>
                        
                    </View>
                </Modal>
                <Text style={styles.titulo} >{inst.nome_fantasia}</Text>
                <Text style={styles.conteudo}>{inst.apresentacao}</Text>
                <Button  
                color={isFollowing?'#bbb':'#6399FA' }  title={isFollowing? 'seguindo':'Seguir'} onPress={()=>setFolModalVisible(true)}
                />
                <Text>{msgFollow}</Text>
                <FlatList 
                numColumns={2}
                data={galeria}
                keyExtractor={item=>item.publicacao.id}
                renderItem={({item, index}) =>
                    <TouchableOpacity onPress={()=>navigation.push('Publicacao', {id:item.publicacao.id})} >
                            {
                                item.foto_publicacao != null ?
                                <View style={styles.galeria_cell_foto} >
                                    <Image source={{uri:'data:image/jpeg;base64,' + item.foto_publicacao.foto}} style={styles.foto_galeria}/>
                                    <Text style={styles.titulo_galeria} >{item.publicacao.titulo}</Text>
                                </View>
                                :
                                <View style={styles.galeria_cell}  >
                                    <Text style={styles.titulo_galeria} >{item.publicacao.titulo}</Text>
                                    <Text style={styles.conteudo_galeria} >{item.preview_text}</Text>
                                </View>
                            }
                    </TouchableOpacity>
                }
                refreshing={isLoading}
                onRefresh={getPublicacoesInst}
                />
            </View>
        }
        </View>
    );
}

export default PerfilInst;