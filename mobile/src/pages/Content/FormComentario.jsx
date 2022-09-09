import { React, useState, useContext } from 'react';
import { Text, TextInput, View, Button, KeyboardAvoidingView, Touchable, TouchableOpacity, Modal } from 'react-native';
import styles from '../styles';

import AuthContext from '../../contexts/auth';

function FormComentario({id_publicacao, id_pai}){
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
                    id_pai: null
                })
            })
            .then(res => res.json())
            .then(console.log(res))
            .catch(err => alert(err));
        }
        else{
            setPlaceholder('O comentário não pode estar vazio!');
        }

    }

    return(
        <KeyboardAvoidingView>
            <Modal
            visible={modalVisible}
            transparent={true}
            animationType='fade'
            onRequestClose={()=>setModalVisible(!modalVisible)}
            >
                <View style={styles.container} >
                    <TextInput 
                    multiline={true} 
                    numberOfLines={5} 
                    placeholder={placeholder} 
                    onChangeText={(text)=>setText(text)}
                    value={text}
                    />
                    <Button title='Comentar' onPress={()=>setModalVisible(false)}/>
                </View>
                
            </Modal>
            <TouchableOpacity onPress={()=>setModalVisible(true)} >
                <Text>{text!=''?text:'Comentar...'}</Text>
            </TouchableOpacity>


            

        </KeyboardAvoidingView>
    );


}

export default FormComentario;