import { React, useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity, Button } from 'react-native'
import AuthContext from '../../contexts/auth';
import styles from '../styles';



function PerfilInst({route, navigation}){

    const [isLoading, setLoading] = useState(true);
    const [inst, setInst] = useState([]);
    const [isFollowing, setFollowing] = useState(true);
    const [galeria, setGaleria] = useState([]);
    const { token, usuario, NODE_PORT } = useContext(AuthContext)

    function getPerfilById(){
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
    }

    function getPublicacoesInst(){
        setLoading(true);
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
        setLoading(false);
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
            console.log('Follow? ' + result.ver);
            setFollowing(result.ver);
        })
        .catch(err => alert(err))
    }

    function follow(){
        if(!isFollowing)
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

        getPerfilById();
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
                <Text style={styles.titulo} >{inst.nome_fantasia}</Text>
                <Text style={styles.conteudo}>{inst.apresentacao}</Text>
                <Button disabled={isFollowing?true:false} title={isFollowing? 'seguindo':'Seguir'} onPress={follow} />
                <FlatList 
                numColumns={3}
                data={galeria}
                keyExtractor={item=>item.id}
                renderItem={({item, index}) =>
                    <TouchableOpacity onPress={()=>navigation.navigate('Publicacao', {id:item.id})} >
                        <View style={styles.galeria_cell}>
                            <Text style={{fontWeight:'bold'}}>{item.titulo}</Text>
                            <Text >{item.descricao}</Text>
                            </View>
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