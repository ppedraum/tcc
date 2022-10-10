import { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import styles from '../styles.js';
import AuthContext from '../../contexts/auth';
import { useIsFocused } from "@react-navigation/native";

function Inscricoes({navigation}){

    const { token, NODE_PORT, usuario } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [desModalVisible, setDesModalVisible] = useState(false);
    const [publiInscritas, setPubliInscritas] = useState([]);
    const isFocused = useIsFocused();
    
/*     function DesinscreverModal({id_evento}){
        return(
        <Modal
        visible={desModalVisible}
        transparent
        animationType='fade'
        onRequestClose={()=>setDesModalVisible(false)}
        >
            <View style={styles.container}>
                <Text style={styles.conteudo} >
                    Você tem certeza que deseja se desinscrever?
                </Text>
                <View style={styles.filtros_container} >
                    <Button title='Sim' onPress={()=>desinscrever(id_evento)} />
                    <Button title='Não' onPress={()=>setDesModalVisible(false)} />
                </View>
            </View>

        </Modal>
        );
        
    }

    function desinscrever(id_evento){
        setLoading(true);
        fetch(NODE_PORT + '/inscricoes/evento',{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({
                id_usuario : usuario.id,
                id_evento : id_evento
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
        getInscricoes();
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
        console.log('Desinscreveu id ' + id_evento);
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
        setDesModalVisible(false);
    } */


    function getInscricoes(){
        fetch(NODE_PORT + '/perfil/inscricoes/' + usuario.id, {
            method : 'GET',
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(publiInscritas => setPubliInscritas(publiInscritas))
        .catch(err => console.log(err));

        setLoading(false);
    }



    useEffect(()=>{
        getInscricoes();
    }, [isFocused]);

    return(
        isLoading ? <ActivityIndicator size='large'/>
        :
        <View style={styles.container}>
            <FlatList
            data={publiInscritas}
            keyExtractor={(item)=>item.id}
            renderItem={({item, index})=>
                <View key={item.id_evento} >
                    {/* <DesinscreverModal id_evento={item.id_evento} /> */}
                    <TouchableOpacity onPress={()=>navigation.navigate('Publicacao', {id:item.id})}>
                    <Text style={styles.titulo} >{item.titulo}</Text>
                    </TouchableOpacity>
                    <Button title='Desinscrever'/>
                </View>
            }
            />
        </View>

    );
}

export default Inscricoes;