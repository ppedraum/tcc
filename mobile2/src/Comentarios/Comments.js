import styles from './styles.json';

import React, {useState, useEffect, useContext} from 'react';

import {Text, View } from 'react-native';

//nossa lista de comentários
import {getComments as getCommsApi} from './api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import AuthContext from '../contexts/auth'

export default function Comments() {

    const { usuario } = useContext(AuthContext);

    /*
        um array com todos os comentários, setados com useEffect()
        beComments de BackEnd comments, ou seja, uma simulação de um banco de dados mas utilizando funções que
        retornam um array de objetos
    */
    const [comentarios, setComentarios] = useState([]);


    //Um array com todos os comentários que não são filhos de outros comentários (comentários raiz)
    const rootComms = comentarios.filter((comentario)=>comentario.id_pai === null);


    //Um array com todos os comentários que são filhos de outro comentário (identificado pelo seu id (rootCommId))
    /*
        Esse tipo de reply carrega toda vez que o comentário pai for renderizado, o que pode causar problemas de performance
        quando há muitos comentários de uma vez (ex.: + de 1000)
    */
    const replies = (idRootComm) => {
        return comentarios
        .filter((comentario)=> comentario.id_pai === idRootComm)
        .sort((a, b)=> 
            new Date(a.data_post).getTime() - new Date(b.data_post).getTime()
        );
    }


    function addComment(text, parentId){
        console.log("addComment: ", text, " ", parentId);
    }

    console.log('becomms', comentarios);


    useEffect(()=>{

        getCommsApi().then((data)=>{
            setComentarios(data);
        })

    }, []);

    return (
        <View style={styles.comments} >
            <Text style={styles.comments_title} >Comments</Text>
            <View style={styles.comment_form_title}><Text>Write Comment</Text></View>

            <CommentForm submitLabel="Write" handleSubmit={addComment} />
            <View style={styles.comments_container}>

                {rootComments.map(comm => (
                <>  
                    <Comment key={comm.id} comentario={comm} replies={replies(comm.id)} />
                </>

                ))}
            </View>

        </View>
    );
}
