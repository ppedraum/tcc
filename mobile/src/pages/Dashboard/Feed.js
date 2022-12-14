import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '../styles'

import AuthContext from '../../contexts/auth';
import { Ionicons } from '@expo/vector-icons';

//import { AiOutlineSearch } from 'react-icons'; 

/*
    NÃO estou autorizado pela API para pegar as publicações devido à autenticação por token,
    sendo assim, preciso mandar pelo fetch de cada um o header Authorization com o token para conseguir
    acessar o JSON com elas.

*/




function Feed({navigation}) {


    const [isLoading, setLoading] = useState(true);
    const [publicacoes, setPublicacoes] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    /*
    Ver como usar o axios para não precisar passar o token pelo AuthContext (fica não-profissional)
    */

    const { token, NODE_PORT } = useContext(AuthContext);


    
    function getPublicacoes(){
        fetch( NODE_PORT + '/projeto/publicacoes', {
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
            
        })
        .then(res => res.json())
        .then(result => {
            setPublicacoes(result);
            //console.log(publicacoes);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }


    useEffect(()=>{
        getPublicacoes();
    }, [token]);

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Meu Feed</Text>
            <View style={styles.searchContainer} >
                <TextInput style={styles.input} placeholder={'Buscar por publicações'} onChangeText={(text)=>setSearchInput(text)} />
                <Button style={styles.botaofoda} title='Procurar' onPress={()=>{
                    if(searchInput.trim() != 0)
                        navigation.navigate('ResultScreen', { searchInput })
                        
                    }
                } 
                    
                />                
        </View>
                
                {
                isLoading ?
                <ActivityIndicator size='large'/>
                :
                /* console.log(publicacoes) */
                /*
                Temos que 'desestruturar' a resposta do renderItem em partes diferentes

                uma parte é o item em si (item) (nosso post)
                a outra é o index do item (id dele na flatlist)
                */
                <FlatList
                data={publicacoes}
                keyExtractor={(item)=>item.publicacao.id}
                renderItem={({ item, index })=> (
                    <TouchableOpacity onPress={()=>navigation.navigate('Publicacao', {id:item.publicacao.id})} >
                        <View style={styles.post_cell}>
                            {
                                item.foto_publicacao != null ?
                                <View style={
                                item.publicacao.tipo_publicacao == 'PUBLICACAO'?
                                styles.flatlist_cell
                                :
                                styles.flatlist_cell_evento
                                }
                                >
                                    <Text>{item.publicacao.tipo_publicacao}</Text>
                                    <Image source={{uri:'data:image/jpeg;base64,' + item.foto_publicacao.foto}} style={styles.foto_perfil}/>
                                    <Text style={styles.titulo} >{item.publicacao.titulo}</Text>
                                    <Text style={styles.conteudo}> Por {item.nome_instituicao}</Text>
                                </View>
                                :
                                <View style={
                                item.publicacao.tipo_publicacao == 'PUBLICACAO'?
                                styles.flatlist_cell
                                :
                                styles.flatlist_cell_evento
                                }
                                >
                                    <Text>{item.publicacao.tipo_publicacao}</Text>
                                    <Text style={styles.titulo} >{item.publicacao.titulo}</Text>
                                    <Text style={styles.conteudo}> Por {item.nome_instituicao}</Text>
                                    <Text style={styles.conteudo} >{item.preview_text}</Text>
                                </View>
                            }
                            

                        </View>
                    </TouchableOpacity>
                )}
                refreshing={isLoading}
                onRefresh={()=>getPublicacoes()}
                />
                
            }
        </View>
    )


}

export default Feed;