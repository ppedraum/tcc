import { React, useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles';
import AuthContext from '../../contexts/auth';
import { ActivityIndicator } from 'react-native-paper';

function ResultScreen({ route, navigation }){

    const { token, NODE_PORT } = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);
    const [instituicoes, setInstituicoes] = useState([]);
    const [publicacoes, setPublicacoes] = useState([]);
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
            setPublicacoes(publicacoes);
            setLoading(false);
        })
        .catch(err => console.log(err));
        setTipoResultado('Publicacao');
        
    }

    useEffect(()=>{
        handleSearchAll();
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
            setInstituicoes(insts);
            setLoading(false);
        })
        .catch(err => console.log(err));
        setTipoResultado('Instituicao');

    }

    function handleSearchAll(){
        getInstituicoesByName();
        getPublicacoesByName();
        setTipoResultado('All');
    }

    function HandleListAll(){
        return (
        <ScrollView>
            <Text style={styles.titulo} >Instituições</Text>
            {
            instituicoes.map((inst)=>
            <TouchableOpacity key={inst.id} >
                <View >
                    <Text style={styles.titulo} >
                        {inst.nome_fantasia}
                    </Text>
                    <Text style={styles.conteudo}>
                        {inst.apresentacao}
                    </Text>
                </View>
            </TouchableOpacity>
            )
            }
            <Text style={styles.titulo} >Publicações</Text>
            {
            publicacoes.map((publi)=>
            <TouchableOpacity key={publi.id} >
                <View>
                    <Text style={styles.titulo} >
                        {publi.titulo}
                    </Text>
                    <Text style={styles.conteudo} >
                        {publi.descricao}
                    </Text>
                </View>
            </TouchableOpacity>
            )
            }
        </ScrollView>    
        );
    }

    return(
        isLoading ? <ActivityIndicator size='Large'/> : 
        <View style={styles.container}>
            <Text style={styles.titulo}>Resultados</Text>
            <View style={styles.searchContainer} >
                <TextInput style={styles.input} 
                value={searchInput} 
                placeholder='Procurar resultados' 
                onChangeText={(text)=>setSearchInput(text)} 
                />
                <Button title='Procurar' onPress={handleSearchAll} />
            </View>
            <View style={styles.filtros_container} >
            <Button title='Tudo' onPress={handleSearchAll} />
                <Button title='Publicacoes'  onPress={getPublicacoesByName}/>
                <Button title='Instituições' onPress={getInstituicoesByName}/>
                
            </View>
            
            {
                tipoResultado == 'Publicacao' ? 
                    <FlatList 
                    data={publicacoes}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>
                    <TouchableOpacity onPress={()=>navigation.navigate('Publicacao', {
                        id:item.id
                    })} >
                        <View>
                            <Text style={styles.titulo} >{item.titulo}</Text>
                            <Text style={styles.conteudo}>{item.descricao}</Text>
                        </View>
                    </TouchableOpacity>
                    }
                    refreshing={isLoading}
                    onRefresh={getPublicacoesByName}
                    />
                :
                null
            }
            {
                tipoResultado == 'Instituicao' ? 
                    <FlatList 
                    data={instituicoes}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>
                    <TouchableOpacity onPress={()=>navigation.navigate('PerfilInst', {
                        id:item.id
                    })} >
                        <View>
                            <Text style={styles.titulo} >{item.nome_fantasia}</Text>
                            <Text style={styles.conteudo}>{item.apresentacao}</Text>
                        </View>
                    </TouchableOpacity>
                    }
                    refreshing={isLoading}
                    onRefresh={getInstituicoesByName}
                    />
                :
                null
            }
            {
                tipoResultado == 'All' ?
                <HandleListAll/>
                :
                null
            }
            
        </View>
    );
}

export default ResultScreen;

