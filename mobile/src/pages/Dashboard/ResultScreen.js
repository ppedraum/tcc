import { React, useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
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
        if(searchInput.trim() != 0){
            getInstituicoesByName();
            getPublicacoesByName();
            setTipoResultado('All');
        }
    }

    function HandleListAll(){
        if(instituicoes.length == 0 && publicacoes.length == 0)
            return (
            <Text style={styles.conteudo}>
                Não foi encontrado nenhum resultado para essa pesquisa. Tente refazê-la em outras palavras.
            </Text>
            );
        
        else
            return (
            <ScrollView>
                <Text style={styles.titulo} >Instituições</Text>
                {
                    instituicoes.length == 0 ?
                    <Text style={styles.conteudo} >Não foi encontrado nehuma instituição.</Text>
                    :
                    instituicoes.map((inst)=>
                    <TouchableOpacity key={inst.id} onPress={()=>navigation.navigate('PerfilInst', {
                        id:inst.id
                    })} >
                        <View style={styles.flatlist_cell} >
                            <Image source={{uri: 'data:image/jpeg;base64,' + inst.foto_perfil}} style={styles.foto_perfil} />
                            <Text style={styles.titulo} >{inst.nome_fantasia}</Text>
                        </View>
                    </TouchableOpacity>
                    )

                }
                <Text style={styles.titulo} >Publicações</Text>
                {
                    publicacoes.length == 0 ?
                    <Text style={styles.conteudo} >Não foi encontrado nehuma publicação.</Text>
                    :
                    publicacoes.map((publicacao)=>
                    <TouchableOpacity key={publicacao.publicacao.id} onPress={()=>navigation.navigate('Publicacao', {id:publicacao.publicacao.id})} >
                        <View style={styles.post_cell}>
                            {
                                publicacao.foto_publicacao != null ?
                                <View style={
                                publicacao.publicacao.tipo_publicacao == 'PUBLICACAO'?
                                styles.flatlist_cell
                                :
                                styles.flatlist_cell_evento
                                }
                                >
                                    <Text>{publicacao.publicacao.tipo_publicacao}</Text>
                                    <Image source={{uri:'data:image/jpeg;base64,' + publicacao.foto_publicacao.foto}} style={styles.foto_perfil}/>
                                    <Text style={styles.titulo} >{publicacao.publicacao.titulo}</Text>
                                    <Text style={styles.conteudo}> Por {publicacao.nome_instituicao}</Text>
                                </View>
                                :
                                <View style={
                                publicacao.publicacao.tipo_publicacao == 'PUBLICACAO'?
                                styles.flatlist_cell
                                :
                                styles.flatlist_cell_evento
                                }
                                >
                                    <Text>{publicacao.publicacao.tipo_publicacao}</Text>
                                    <Text style={styles.titulo} >{publicacao.publicacao.titulo}</Text>
                                    <Text style={styles.conteudo}> Por {publicacao.nome_instituicao}</Text>
                                    <Text style={styles.conteudo} >{publicacao.preview_text}</Text>
                                </View>
                            }
                            

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
                    publicacoes.length == 0 ?
                    <Text style={styles.conteudo} >
                        Não foi encontrado nenhuma publicação com essa pesquisa. Tente refazê-la com outras palavras. 
                    </Text>
                    :
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
                    onRefresh={()=>getPublicacoesByName()}
                    />
                :
                null
            }
            {
                tipoResultado == 'Instituicao' ? 
                    instituicoes.length == 0 ?
                    <Text style={styles.conteudo} >
                        Não foi encontrado nenhuma instituição com essa pesquisa. Tente refazê-la com outras palavras. 
                    </Text>
                    :
                    <FlatList 
                    data={instituicoes}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>
                    <TouchableOpacity onPress={()=>navigation.navigate('PerfilInst', {
                        id:item.id
                    })} >
                        <View style={styles.flatlist_cell} >
                            <Image source={{uri: 'data:image/jpeg;base64,' + item.foto_perfil}} style={styles.foto_perfil} />
                            <Text style={styles.titulo} >{item.nome_fantasia}</Text>
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

