import { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from '../styles.js';
import AuthContext from '../../contexts/auth';
import { useIsFocused } from "@react-navigation/native";

function Inscricoes({navigation}){

    const { token, NODE_PORT, usuario } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [publiInscritas, setPubliInscritas] = useState([]);
    const isFocused = useIsFocused();

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
            
                <View key={item.id} >
                    <TouchableOpacity onPress={()=>navigation.navigate('Publicacao', {id:item.id})}>
                    <Text style={styles.titulo} >{item.titulo}</Text>
                    </TouchableOpacity>
                    <Button title='Desinscrever' onPress={()=>{desinscrever(item.id_evento)}} />
                </View>
            

            }
            />
        </View>

    );
}

export default Inscricoes;