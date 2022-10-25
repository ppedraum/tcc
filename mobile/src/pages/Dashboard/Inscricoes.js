import { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import Dialog from 'react-native-dialog';
import styles from '../styles.js';
import AuthContext from '../../contexts/auth';
import { useIsFocused } from "@react-navigation/native";

function Inscricoes({navigation}){

    const { token, NODE_PORT, usuario } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [desDialogVisible, setDesDialogVisible] = useState(false);
    const [publiInscritas, setPubliInscritas] = useState([]);
    const [inscSelecionada, setInscSelecionada] = useState([]);
    const isFocused = useIsFocused();
    
    function getInscricoes(){
        fetch(NODE_PORT + '/perfil/inscricoes/' + usuario.id, {
            method : 'GET',
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        /* 
        Por algum motivo, para a flatlist dar re-render, é necessário seguir esses passos:
        1. Na FlatSlist, adicionar a propriedade extraData e passar como parâmetro a variável de estado
           (os itens da flatlist)
        2. Ao dar o setPubliInscritas, é necessário uma função que retorna, ao invés da variável em si, um array
        onde os itens do array atualizado são colocados dentro dele (com o ... + o array, passamos os itens ao invés do array) 
        */
        .then(publiInscritas => setPubliInscritas(()=>{return [...publiInscritas]}))
        .catch(err => console.log(err));

        setLoading(false);
    }

    function desinscrever(id_evento){
        setLoading(true);
        fetch(NODE_PORT + '/perfil/inscricao', {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify({
                id_evento : id_evento
            })
        })
        .then(res => console.log('Status da delecao da insc: ' + res.status))
        .catch(err => console.log('Erro delecao insc: ' + err));
        setDesDialogVisible(false);
        getInscricoes();
    }

    function handleDelecaoInscricao(insc){
        setInscSelecionada(insc);
        setDesDialogVisible(true);
    }

    useEffect(()=>{
        
    }, []);

    return(
        isLoading ? <ActivityIndicator size='large'/>
        :
        <View style={styles.container}>
            <Dialog.Container visible={desDialogVisible} >
                <Dialog.Title>Desinscrever-Se</Dialog.Title>
                <Dialog.Description>
                    Você quer realmente se desinscrever desse evento?
                </Dialog.Description>
                <Dialog.Button label='Sim' onPress={()=>desinscrever(inscSelecionada.id_evento)} />
                <Dialog.Button label='Não' onPress={()=>setDesDialogVisible(false)} />
            </Dialog.Container>
            {
                publiInscritas.length == 0 ?
                <Text style={styles.conteudo} >Você não está inscrito em nenhum evento!</Text>
                :
                <FlatList
                extraData={publiInscritas}
                data={publiInscritas}
                keyExtractor={(item)=>item.id}
                renderItem={({item, index})=>
                    <View key={item.id_evento} style={styles.flatlist_cell_evento}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Publicacao', {id:item.id})}>
                        <Text style={styles.titulo} >{item.titulo}</Text>
                        </TouchableOpacity>
                        <Button color={'#2B703E'} title='Desinscrever' onPress={()=>handleDelecaoInscricao(item)}/>
                    </View>
                }
                />
            }
            
        </View>

    );
}

export default Inscricoes;