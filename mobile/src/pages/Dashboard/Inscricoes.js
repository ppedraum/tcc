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
        .then(publiInscritas => setPubliInscritas(publiInscritas))
        .catch(err => console.log(err));

        setLoading(false);
    }

    function desinscrever(id_evento){

        setLoading(true);

        /*
        Para evitar um possivel problema de tentar se desinscrever duas vezes, aqui criamos uma cópia das publiInscritas,
        e setamos ela com setPubliInscritas só que sem o evento que vamos nos desinscrever no array. Assim temos certeza
        que o item desaparecerá na lista e que poderemos fazer a requisição normalmente.
        */

        //Pegamos o index da publi que queremos tirar do array filtrando ela pelo id do evento dela
        const index = publiInscritas.indexOf(publiInscritas.filter(publi=>publi.id_evento == id_evento)[0]);
        //Fazemos uma deep copy das nossas publiInscritas
        let copia = JSON.parse(JSON.stringify(publiInscritas));
        
        //Se conseguimos pegar o index (se a publi existir), tiramos ela do nosso array copiado
        if(index > -1)
            copia.splice(index, 1);

        //Setamos as publiInscritas com o nosso array com a publi alvo ja excluida
        setPubliInscritas(copia);

        //Fazemos a deleção da inscrição normalmente.
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
        setLoading(false);
       
        /*
        Note que náo pegamos de volta as publiInscritas com getInscricoes, isso é porque deixamos o
        array com apenas a atualização local, deixando o app mais leve e garantindo que nao volte
        a publi com o evento ja desinscrito.
        
        */
    }   

    function handleDelecaoInscricao(insc){
        setInscSelecionada(insc);
        setDesDialogVisible(true);
    }

    useEffect(()=>{

        let abortController = new AbortController();

        getInscricoes();
        return ()=>abortController.abort();

    }, [isFocused]);

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