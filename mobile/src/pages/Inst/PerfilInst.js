import { React, useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity, Button, Modal, Image, ScrollView } from 'react-native'
import AuthContext from '../../contexts/auth';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
        })
        .catch(err => console.log(err))
        getPublicacoesInst();
        setTimeout(()=>{setLoading(false)}, 200);
    }

    function HandleGaleriaRender(){
        return(
        galeria.map(publicacao => (
            <TouchableOpacity key={publicacao.publicacao.id} onPress={()=>navigation.push('Publicacao', {id:publicacao.publicacao.id})} >
                    {
                        publicacao.foto_publicacao != null ?
                        <View style={styles.galeria_cell} >
                            <Image source={{uri:'data:image/jpeg;base64,' + publicacao.foto_publicacao.foto}} style={styles.foto_galeria}/>
                        </View>
                        :
                        <View style={styles.galeria_cell}  >
                            <Text style={styles.titulo_galeria} >{publicacao.publicacao.titulo}</Text>
                        </View>
                    }
            </TouchableOpacity>
        ))
        );
        
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
        .catch(err => console.log(err));
    }

    function verFollow(id_inst, id_usuario){
        fetch( NODE_PORT + '/inscricoes/ver_follow/' + id_inst + '/' + id_usuario, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            },
        } )
        .then(res => res.json())
        .then(result => setFollowing(result.ver))
        .catch(err => console.log('erro em verFollow (PerfilInst): ', err));
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
        .catch(err => console.log('Erro em unfollow (PerfilInst):', err));

        setFollowing(false);

        setMsgFollow('Você parou de seguir ' + inst.nome_fantasia + '.'  );
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
        .then(res=>console.log('Follow: ', res.status))
        .catch(err => console.log('Erro em follow (PerfilInst): ', err));
        
        setFollowing(true);

        setMsgFollow('Você está seguindo ' + inst.nome_fantasia + '!'  );
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

        let abortController = new AbortController();

        getPerfilById();

        return ()=>abortController.abort();

    }, [])

    return(
        <ScrollView>
        <View style={styles.container} >
        
        {
            isLoading ? <ActivityIndicator size='large' color='white'/>
            :
            <View style={styles.containerpinst}>
                <Modal
                visible={folModalVisible}
                transparent={true}
                animationType='fade'
                onRequestClose={()=>setFolModalVisible(!folModalVisible)}
                >
                    <View style={styles.container}>
                        <Text style={styles.conteudo}>
                            {isFollowing?
                            'Você tem certeza que deseja parar de seguir?'
                            :
                            'Você deseja seguir essa instituição?'
                            }
                        </Text>
                        <View  style={styles.filtros_container}>
                            <TouchableOpacity style={styles.botao}
                                onPress={handleFollow}>
                                <Text>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botao}
                                onPress={()=>setFolModalVisible(!folModalVisible)}>
                                <Text>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Image source={{uri:'data:image/jpeg;base64,' + inst.foto_perfil}} style={styles.foto_perfil} /> 
                <Text style={styles.titulo} >{inst.nome_fantasia}</Text>
                <Text style={styles.conteudo}>{inst.apresentacao}</Text>
                <TouchableOpacity style={isFollowing ? styles.botaoseguindo : styles.botaoseguir}
                onPress={()=>setFolModalVisible(true)}>
                    {
                        isFollowing ?
                        <Text style={styles.botaotext2}>Seguindo
                        <MaterialCommunityIcons
                            name='account-star'
                            size={17}
                        />
                        </Text>
                        :
                        <Text style={styles.botaotext1}>Seguir  
                        <MaterialCommunityIcons
                            name='account-outline'
                            size={17}
                        /></Text>
                        
                    }
                </TouchableOpacity>
                <Text style={styles.conteudo}>{msgFollow}</Text>
                <View style={styles.galeria} >
                <HandleGaleriaRender/>
                </View>
                
            </View>
        }
        </View>
        </ScrollView>
    );
}

export default PerfilInst;