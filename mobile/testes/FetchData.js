import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

function FetchData() {

    /*
    useStates para o loading do app e os dados do arquivo json.
    o loading serve apenas para indicar ao usuário que algo está carregando, nesse caso,
    a requisição do app para pegar o conteúdo do servidor localhost:3001 na rota /cad
    */
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //useEffect para carregar o arquivo apenas uma vez.
    useEffect(()=> {
        //um fetch para pegar os dados e o tratamento dele transformando em um objeto
        //js e depois salvando na var data
        //também seta o carregamento para false
        //Se houver erro manda por alert e não mostra os dados
        fetch('http://localhost:3001/pessoas')
        .then(res => res.json())
        .then(result => {
            setData(result);
            setLoading(false);
        })
        .catch(err => console.log(err))
    });

    /*     function getPostById(id){
        setLoading(true);
        fetch('http://localhost:3001/posts/'+id)
        .then(res => res.json())
        .then(result => {
            setPosts(result);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }
    */

    function getContent(){
        if(isLoading) return <ActivityIndicator size="large"/>
        else {
            return(
                <Text>
                {data[2].nome}
                </Text>
            );
        }
    }

    return(
        <View style={styles.container}>
            {getContent()}
        </View>
    )


}

export default FetchData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});