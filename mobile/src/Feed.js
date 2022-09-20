import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, FlatList } from 'react-native';
import styles from '../styles'


function Feed() {


    const [isLoading, setLoading] = useState(true);
    const [publicacoes, setPublicacoes] = useState([]);
    const [searchInput, setSearchInput] = useState('');


    function getPublicacoes(){
        fetch('http://localhost:3001/publicacoes')
        .then(res => res.json())
        .then(result => {
            setPublicacoes(result);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }
    
    function getPublicacoesByName(nome){
        setLoading(true);
        fetch('http://localhost:3001/publicacoes/'+nome)
        .then(res => res.json())
        .then(result => {
            setPublicacoes(result);
            setLoading(false);
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    useEffect(()=>{
        getPublicacoes()
    }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Meu Feed</Text>
            <View style={styles.searchContainer} >
                <TextInput style={styles.input} placeholder='Procurar publicacoes' onChangeText={(text)=>setSearchInput(text)} />
                <Button title='Procurar' onPress={()=>getPublicacoesByName(searchInput)} />
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
                keyExtractor={(item)=>item.id}
                renderItem={({ item, index })=> (
                    <View style={styles.post_cell}>
                    <Text style={styles.titulo} >{item.titulo}</Text>
                    <Text style={styles.conteudo} >{item.descricao}</Text>
                    </View>
                )}
                />
                
            }
        </View>
    )


}

export default Feed;