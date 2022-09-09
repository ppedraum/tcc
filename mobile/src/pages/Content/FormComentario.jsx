import { React, useState, useContext } from 'react';
import { Text, TextInput, View, Button, KeyboardAvoidingView, Touchable, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

import AuthContext from '../../contexts/auth';

function FormComentario({id_publicacao, id_pai, tipo='textinput'}){
    const { usuario, token, NODE_PORT } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [placeholder, setPlaceholder] = useState('Comentar...')

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
            .catch(err => alert(err));
        }
        setModalVisible(false);

    }

    if(tipo == 'textinput')
        return(
            <KeyboardAvoidingView>
                <Modal
                visible={modalVisible}
                transparent={true}
                animationType='fade'
                onRequestClose={()=>setModalVisible(!modalVisible)}
                >
                    <View>
                        <TouchableOpacity onPress={()=>setModalVisible(false)} >
                            <Ionicons name="chevron-back-circle" size={24} color="#4490F5" />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.container} >
                        <TextInput 
                        multiline={true} 
                        numberOfLines={5} 
                        onChangeText={(text)=>setText(text)}
                        placeholder='Comentar...'
                        />
                        <Button title='Comentar' onPress={comentar}/>
                    </View>
                    
                </Modal>
                <TouchableOpacity onPress={()=>setModalVisible(true)} >
                    <Text>{text!=''?text:'Comentar...'}</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    else if(tipo == 'icon')
        return(
            <>
            <Modal
            visible={modalVisible}
            transparent={true}
            animationType='fade'
            onRequestClose={()=>setModalVisible(!modalVisible)}
            >
                <View>
                    <TouchableOpacity onPress={()=>setModalVisible(false)} >
                        <Ionicons name="chevron-back-circle" size={24} color="#4490F5" />
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.container} >
                    <TextInput 
                    multiline={true} 
                    numberOfLines={5} 
                    onChangeText={(text)=>setText(text)}
                    value={text}
                    placeholder='Comentar...'
                    />
                    <Button title='Comentar' onPress={comentar}/>
                </View>
                
            </Modal>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#4490F5" />
            </TouchableOpacity>
            </>
            
        );

}

export default FormComentario;