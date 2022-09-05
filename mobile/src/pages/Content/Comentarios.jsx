import { React, useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import AuthContext from '../../contexts/auth';
import styles from '../styles';

function Comentarios({id_publicacao}){

    const { NODE_PORT, token, usuario } = useContext(AuthContext);
    const [comentarios, setComentarios] = useState([]);


    function getComentarios(){
        fetch(NODE_PORT + '/postinteraction/comentarios/' + id_publicacao, {
            method:'GET',
            headers:{Authorization: `Bearer ${token}`}
        })
        .then(res=>res.json())
        .then(comentarios=>setComentarios(comentarios));
        
    }

    function HandleComentarios(){
        const filhos = comentarios.filter(comentario=>comentario.id_pai !== null);
        const pais = comentarios.filter(comentario=>comentario.id_pai === null);
        return pais.map((commPai)=>(
            <View key={commPai.id} style={styles.post_cell} >
                <Text style={styles.conteudo} >{commPai.conteudo}</Text>
                <View style={{marginLeft:20}} >
                {
                    filhos.map(commFilho=>{
                        if(commFilho.id_pai == commPai.id)
                            return <Text key={commFilho.id} style={styles.conteudo} >{commFilho.conteudo}</Text>
                    })
                }
                </View>
            </View>
        ));

    }

    useEffect(()=>{getComentarios()}, []);

/*     function handleComentarios(){
        const filhos = comentarios.filter(comentario=>comentario)
    } */

    return (
        <View>
            <View>
                <Text style={styles.titulo} >Comentários</Text>
            </View>
            <HandleComentarios/>
        </View>

    );

}

export default Comentarios;