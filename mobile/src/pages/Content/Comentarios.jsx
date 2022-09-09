import { React, useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import FormComentario from './FormComentario';
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
        const pais = comentarios.filter(comentario=>comentario.id_pai === null).sort((a, b)=>a.datetime_post - b.datetime_post >= 0);
        return pais.map((commPai)=>(
            <View key={commPai.id} style={styles.post_cell} >
                <Text>{commPai.datetime_post}</Text>
                <Text style={styles.conteudo} >{commPai.conteudo}</Text>
                <FormComentario id_publicacao={id_publicacao} id_pai={commPai.id}/>
                <View style={{marginLeft:20}} >
                {
                    filhos.map(commFilho=>{
                        if(commFilho.id_pai == commPai.id)
                            return(
                                <View key={commFilho.id} >
                                    <Text>{commFilho.datetime_post}</Text>
                                <Text key={commFilho.id} style={styles.conteudo} >{commFilho.conteudo}</Text>
                                </View>
                            )
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
                <FormComentario id_publicacao={id_publicacao} id_pai={null}/>
                <Text style={styles.titulo} >Comentários</Text>
            </View>
            <HandleComentarios/>
        </View>

    );

}

export default Comentarios;