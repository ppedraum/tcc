import { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Button, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native';
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
    const [ isConfAppendVisible, setConfAppendVisible ] = useState({
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
    //const [isConfAppendVisible, setConfAppendVisible] = useState(false);

    function editarPerfil(){

    }

    function setEdObj(chave, valor){
        let edicaoCopia = JSON.parse(JSON.stringify(edicao));
        edicaoCopia[chave] = valor;
        setEdicao(edicaoCopia);
    }
    function setAppends(chave, valor){
        let appendCopia = JSON.parse(JSON.stringify(isConfAppendVisible));
        appendCopia[chave] = valor;
        setConfAppendVisible(appendCopia);
        //console.log(chave + ': ' + valor);
    }

    function ConfAppend({nomeCampo, objCampo}){
        if(isConfAppendVisible[nomeCampo])
            return(
                <View style={styles.filtros_container} >
                    <Button title='Confirmar' onPress={()=>setAppends(nomeCampo, false)} />
                    <Button title='Cancelar' onPress={()=>{
                        setEdObj(nomeCampo, objCampo)
                        setAppends(nomeCampo, false);
                    }} 
                    />
                </View>
            );
        else return null;
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                
                <Text style={styles.titulo}>Editar Perfil</Text>
                <View>
                    <Text style={styles.titulo} >Dados Básicos</Text>
                </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>Nome</Text>
                        </View>
                        <View style={styles.filtros_container} >
                            <TextInput 
                                style={styles.input} 
                                onChangeText={text=>setEdObj('nome', text)}
                                value={edicao.nome}
                                placeholder={edicao.nome} 
                                editable={isConfAppendVisible.nome} 
                            />
                            <TouchableOpacity onPress={()=>setAppends('nome', true)} >
                                <Ionicons name='md-pencil-sharp' size={20}/>
                            </TouchableOpacity>
                        </View>
                        <ConfAppend 
                            nomeCampo='nome'
                            objCampo={usuario.nome}
                        />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>e_mail</Text>
                        </View>
                        <View style={styles.filtros_container} >
                            <TextInput 
                                style={styles.input} 
                                onChangeText={text=>setEdObj('e_mail', text)}
                                value={edicao.e_mail}
                                placeholder={edicao.e_mail} 
                                editable={isConfAppendVisible.e_mail} 
                            />
                            <TouchableOpacity onPress={()=>setAppends('e_mail', true)} >
                                <Ionicons name='md-pencil-sharp' size={20}/>
                            </TouchableOpacity>
                        </View>
                        <ConfAppend 
                            nomeCampo='e_mail'
                            objCampo={usuario.e_mail}
                        />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>telefone</Text>
                        </View>
                        <View style={styles.filtros_container} >
                            <TextInput 
                                style={styles.input} 
                                onChangeText={text=>setEdObj('telefone', text)}
                                value={edicao.telefone}
                                placeholder={edicao.telefone} 
                                editable={isConfAppendVisible.telefone} 
                            />
                            <TouchableOpacity onPress={()=>setAppends('telefone', true)} >
                                <Ionicons name='md-pencil-sharp' size={20}/>
                            </TouchableOpacity>
                        </View>
                        <ConfAppend 
                            nomeCampo='telefone'
                            objCampo={usuario.telefone}
                        />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>sexo</Text>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>profissao</Text>
                        </View>
                        <View style={styles.filtros_container} >
                            <TextInput 
                                style={styles.input} 
                                onChangeText={text=>setEdObj('profissao', text)}
                                value={edicao.profissao}
                                placeholder={edicao.profissao} 
                                editable={isConfAppendVisible.profissao} 
                            />
                            <TouchableOpacity onPress={()=>setAppends('profissao', true)} >
                                <Ionicons name='md-pencil-sharp' size={20}/>
                            </TouchableOpacity>
                        </View>
                        <ConfAppend 
                            nomeCampo='profissao'
                            objCampo={usuario.profissao}
                        />
                    </View>
                    <View>
                        <Text style={styles.titulo} >Dados De Localização</Text>
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>cidade</Text>
                        </View>
                        <View style={styles.filtros_container} >
                            <TextInput 
                                style={styles.input} 
                                onChangeText={text=>setEdObj('cidade', text)}
                                value={edicao.cidade}
                                placeholder={edicao.cidade} 
                                editable={isConfAppendVisible.cidade} 
                            />
                            <TouchableOpacity onPress={()=>setAppends('cidade', true)} >
                                <Ionicons name='md-pencil-sharp' size={20}/>
                            </TouchableOpacity>
                        </View>
                        <ConfAppend 
                            nomeCampo='cidade'
                            objCampo={usuario.cidade}
                        />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>uf</Text>
                        </View>
                        <TextInput style={styles.input} placeholder={usuario.uf} />
                    </View>
                    <View>
                        <View style={styles.filtros_container} >
                            <Text>foto_perfil</Text>
                        </View>
                        <TextInput style={styles.input} placeholder={usuario.profissao} />
                    </View>
                
                <View style={styles.filtros_container}>
                    <Button title='Salvar' onPress={()=>{
                        let ed = JSON.parse(JSON.stringify(edicao));
                        delete ed.foto_perfil;
                        console.log(ed);
                    }} />
                    <Button title='Cancelar' onPress={()=>navigation.goBack()} />
                </View>


            </View>
        </ScrollView>
    );
}


export default EditarPerfil;