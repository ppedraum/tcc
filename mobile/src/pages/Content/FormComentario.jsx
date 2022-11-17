import { React, useState, useContext } from 'react';
import { Text, TextInput, View, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

import AuthContext from '../../contexts/auth';

function FormComentario({onComentar, tipo='textinput', id_pai}){
    const { usuario, token, NODE_PORT } = useContext(AuthContext);
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
                <View style={styles.filtros_container}>
                    <TextInput style={styles.inputcmt}
                    multiline={true} 
                    numberOfLines={5} 
                    onChangeText={(texto)=>setTexto(texto)}
                    value={texto}
                    placeholder='Comentar...'
                    />
                    <TouchableOpacity style={styles.botaocmt}
                    onPress={handleComentar}>
                        <Text>Comentar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>


        );
    else if(tipo == 'icon')
        return(
            <>
            <TouchableOpacity 
            onPress={()=>setCommAreaVisible(!commAreaVisible)}>
                <Ionicons name="chatbubble-ellipses"
                 size={24} 
                 color="#fff" />
            </TouchableOpacity>
            {
            commAreaVisible ?
            <KeyboardAvoidingView>
                <TextInput style={styles.inputcmt}
                multiline={true} 
                numberOfLines={5} 
                onChangeText={(texto)=>setTexto(texto)}
                value={texto}
                placeholder='Responder...'
                />
                <View style={styles.filtros_container}>
                <TouchableOpacity style={styles.botao} onPress={handleComentar}>
                    <Text>Publicar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={()=>setCommAreaVisible(false)}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>
                </View>
                
            </KeyboardAvoidingView>
            :
            null
            }
            </>

        );

}

export default FormComentario;