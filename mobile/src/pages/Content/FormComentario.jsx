import { React, useState, useContext } from 'react';
import { Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

import AuthContext from '../../contexts/auth';
import CommContext from '../../contexts/comentario';

function FormComentario({id_publicacao, id_pai, tipo='textinput'}){
    const { usuario, token, NODE_PORT } = useContext(AuthContext);
    const { refresh, toRefresh, stopRefresh } = useContext(CommContext);
    const [text, setText] = useState('');
    const [commAreaVisible, setCommAreaVisible] = useState(false);

    function comentar(){
        if(text.trim() !=0){
            fetch(NODE_PORT + '/postinteraction/comentarios', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`,
                },
                body:JSON.stringify({
                    conteudo: text,
                    id_publicacao: id_publicacao,
                    id_usuario: usuario.id,
                    id_pai: id_pai
                })
            })
            .then(res=>console.log('Status do post comentario: ' + res.status))
            .catch(err => {
                console.log(err)
                stopRefresh();
            });
        }
        toRefresh();
        setCommAreaVisible(false);
        
    }

    if(tipo == 'textinput')
        return(

            <KeyboardAvoidingView>
                <TextInput 
                multiline={true} 
                numberOfLines={5} 
                onChangeText={(text)=>setText(text)}
                value={text}
                placeholder='Comentar...'
                style={{maxWidth:200}}
                />
                <Button title='Comentar...' onPress={comentar} />
            </KeyboardAvoidingView>


        );
    else if(tipo == 'icon')
        return(
            <>
            <TouchableOpacity onPress={()=>setCommAreaVisible(!commAreaVisible)}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#4490F5" />
            </TouchableOpacity>
            {
            commAreaVisible ?
            <KeyboardAvoidingView>
                <TextInput 
                multiline={true} 
                numberOfLines={5} 
                onChangeText={(text)=>setText(text)}
                value={text}
                placeholder='Comentar...'
                style={{maxWidth:200}}
                />
                <Button title='Comentar...' onPress={comentar} />
            </KeyboardAvoidingView>
            :
            null
            }
            </>

        );

}

export default FormComentario;