import { React, useState, useContext } from 'react';
import { Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

import AuthContext from '../../contexts/auth';
import CommContext from '../../contexts/comentario';

function FormComentario({onComentar, tipo='textinput', id_pai}){
    const { usuario, token, NODE_PORT } = useContext(AuthContext);
    //const { refresh, toRefresh, stopRefresh } = useContext(CommContext);
    const [texto, setTexto] = useState('');
    const [commAreaVisible, setCommAreaVisible] = useState(false);

    function handleComentar(){
        onComentar(texto, id_pai);
        setTexto('');
        setCommAreaVisible(false);
    }


    if(tipo == 'textinput')
        return(

            <KeyboardAvoidingView>
                <TextInput 
                multiline={true} 
                numberOfLines={5} 
                onChangeText={(texto)=>setTexto(texto)}
                value={texto}
                placeholder='Comentar...'
                style={{maxWidth:200}}
                />
                <Button title='Comentar...' onPress={handleComentar} />
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
                onChangeText={(texto)=>setTexto(texto)}
                value={texto}
                placeholder='Comentar...'
                style={{maxWidth:200}}
                />
                <Button title='Comentar...' onPress={handleComentar} />
            </KeyboardAvoidingView>
            :
            null
            }
            </>

        );

}

export default FormComentario;