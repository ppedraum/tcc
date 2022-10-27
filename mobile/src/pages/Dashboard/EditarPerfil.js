import { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Button, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import AuthContext from '../../contexts/auth';

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

function EditarPerfil({navigation}){

    const { usuario, NODE_PORT, token } = useContext(AuthContext);
    const [ edicao, setEdicao ] = useState({
        nome: usuario.nome,
        e_mail: usuario.e_mail,
        senha: usuario.senha,
        telefone: usuario.telefone,
        sexo: usuario.sexo,
        cidade: usuario.cidade,
        uf: usuario.uf,
        foto_perfil: usuario.foto_perfil,
        is_voluntario: usuario.is_voluntario
    });
    const [ camposValidos, setCamposValidos ] = useState({
        nome: false,
        e_mail: false,
        senha: false,
        telefone: false,
        sexo: false,
        cidade: false,
        uf: false,
        foto_perfil: false,
        is_voluntario: false
    })

    const [errMsg, setErrMsg] = useState({});

    function editarPerfil(){

    }

    function setEdObj(chave, valor){
        let edicaoCopia = JSON.parse(JSON.stringify(edicao));
        edicaoCopia[chave] = valor;
        setEdicao(edicaoCopia);
    }
    function setCamposObj(chave, valor){
        let camposCopia = JSON.parse(JSON.stringify(camposValidos));
        camposCopia[chave] = valor;
        setCamposValidos(camposCopia);
        //console.log(chave + ': ' + valor);
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                
                <Text style={styles.titulo}>Editar Perfil</Text>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>Nome</Text>
                            <Checkbox
                            status={camposValidos.nome ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('nome', !camposValidos.nome)}
                            />
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.nome} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>e_mail</Text>
                            <Checkbox
                            status={camposValidos.e_mail ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('e_mail', !camposValidos.e_mail)}
                            />
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.e_mail} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>telefone</Text>
                            <Checkbox
                            status={camposValidos.telefone ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('telefone', !camposValidos.telefone)}
                            />
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.telefone} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>data_nasc</Text>
                            <Checkbox
                            status={camposValidos.data_nasc ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('data_nasc', !camposValidos.data_nasc)}
                            />
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.senha} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>sexo</Text>
                            <Checkbox
                            status={camposValidos.sexo ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('sexo', !camposValidos.sexo)}
                            />
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.sexo} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>profissao</Text>
                            <Checkbox
                            status={camposValidos.profissao ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('profissao', !camposValidos.profissao)}
                            />
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.profissao} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>cidade</Text>
                            <Checkbox
                            status={camposValidos.cidade ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('cidade', !camposValidos.cidade)}
                            />
                            
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.cidade} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>uf</Text>
                            <Checkbox
                            status={camposValidos.uf ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('uf', !camposValidos.uf)}
                            />
                            
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.uf} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>foto_perfil</Text>
                            <Checkbox
                            status={camposValidos.foto_perfil ? 'checked':'unchecked'}
                            onPress={()=>setCamposObj('foto_perfil', !camposValidos.foto_perfil)}
                            />
                            
                        </View>
                        
                        <TextInput style={styles.input} placeholder={usuario.profissao} />
                    </View>
                
            </View>
        </ScrollView>
    );
}


export default EditarPerfil;