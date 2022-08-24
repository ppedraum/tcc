import { React, useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../styles';
import AuthContext from '../../contexts/auth';
import { ActivityIndicator } from 'react-native-paper';



function ResultScreen({ route, navigation }){

    const { token, NODE_PORT } = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);
    const [resultados, setResultados] = useState([]);
    const [tipoResultado, setTipoResultado] = useState('Publicacao');
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
        .then(publicacoes => {
            setResultados(publicacoes);
            console.log(publicacoes);
        })
        .catch(err => console.log(err));
        setTipoResultado('Publicacao')
        setLoading(false);
    }

    useEffect(()=>{
        getPublicacoesByName();
    }, [])

    function getInstituicoesByName(){
        setLoading(true);
        fetch( NODE_PORT + '/projeto/instituicoes/' + searchInput, {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(insts => {
            setResultados(insts);
        })
        .catch(err => console.log(err));
        setTipoResultado('Instituicao');
        console.log(resultados);
        setLoading(false);

    }

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>Resultados</Text>
            <View style={styles.searchContainer} >
                <TextInput style={styles.input} placeholder='Procurar resultados' onChangeText={(text)=>setSearchInput(text)} />
                <Button title='Procurar' onPress={()=>getPublicacoesByName()} />
            </View>
            <View style={styles.filtros_container} >
                <Button title='Publicacoes' onPress={getPublicacoesByName}/>
                <Button title='Instituições' onPress={getInstituicoesByName}/>
            </View>

            {
            isLoading ? <ActivityIndicator size='large'/> :
            tipoResultado == 'Publicacao' ?
                <FlatList
                data={resultados}
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
                :
                tipoResultado == 'Instituicao' ? 
                    <FlatList
                    data={resultados}
                    keyExtractor={(item)=>item.id}
                    renderItem={({ item, index })=> (
                        <TouchableOpacity onPress={()=>navigation.navigate('Instituicao', {id:item.id})} >
                            <View style={styles.post_cell}>
                                <Text style={styles.titulo} >{item.nome_fantasia}</Text>
                                <Text style={styles.conteudo} >{item.cnpj}</Text>
                                </View>
                        </TouchableOpacity>
                    )}
                    refreshing={isLoading}
                    onRefresh={()=>getInstituicoesByName()}
                    />
                :
                null
            }
            
        </View>
    );
}

export default ResultScreen;

