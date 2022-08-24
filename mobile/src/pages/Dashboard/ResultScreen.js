import { React, useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../styles';
import AuthContext from '../../contexts/auth';
import { ActivityIndicator } from 'react-native-paper';



function ResultScreen({ route, navigation }){

    const { token, NODE_PORT } = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);
    const [publicacoes, setPublicacoes] = useState([]);
    const [searchInput, setSearchInput] = useState(route.params.searchInput);

    function getPublicacoesByName(){
        setLoading(true);
        fetch( NODE_PORT + '/projeto/publicacoes/' + searchInput, {
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
            
        })
        .then(res => res.json())
        .then(result => {
            setPublicacoes(result);
            //console.log(result);
            setLoading(false);
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    useEffect(()=>{
        getPublicacoesByName();
    }, [])

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>Resultados</Text>
            <View style={styles.searchContainer} >
                <TextInput style={styles.input} placeholder='Procurar publicacoes' onChangeText={(text)=>setSearchInput(text)} />
                <Button title='Procurar' onPress={()=>getPublicacoesByName()} />
            </View>

            {
            isLoading ? <ActivityIndicator size='large'/> :
            <FlatList
            data={publicacoes}
            keyExtractor={(item)=>item.id}
            renderItem={({ item, index })=> (
                <TouchableOpacity onPress={()=>navigation.navigate('Publicacao', {id:item.id})} >
                    <View style={styles.post_cell}>
                        <Text style={styles.titulo} >{item.titulo}</Text>
                        <Text style={styles.conteudo} >{item.descricao}</Text>
                        </View>
                </TouchableOpacity>
            )}
            refreshing={isLoading}
            onRefresh={()=>getPublicacoesByName()}
            />
            }
            
        </View>
    );
}

export default ResultScreen;

