import { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Button, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import AuthContext from '../../contexts/auth';

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import base64 from 'react-native-base64';

function EditarPerfil({navigation}){

    const { usuario, NODE_PORT, token, refresh } = useContext(AuthContext);
    const [ edicao, setEdicao ] = useState({
        id: usuario.id,
        nome: usuario.nome,
        e_mail: usuario.e_mail,
        senha: usuario.senha,
        telefone: usuario.telefone,
        sexo: usuario.sexo,
        profissao: usuario.profissao,
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
        profissao: false,
        cidade: false,
        uf: false,
        foto_perfil: false,
        is_voluntario: false
    })

    const [errMsg, setErrMsg] = useState({});
    const [ isSanfBasicos, setSanfBasicos ] = useState(false);
    const [ isSanfLocalizacao, setSanfLocalizacao ] = useState(false);

    async function pickImage(){
        let foto = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
          base64: true
        });

        if (!foto.cancelled) {
            setEdObj('foto_perfil', foto.base64);
        }
      };

    function editarPerfil(){
        fetch(NODE_PORT + '/perfil/alterar_dados', {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                id_usuario : usuario.id,
                dados : edicao
            })
        })
        .then(res => res.json())
        .then(res=> {
            console.log(res.res + ': ', res.status);
            navigation.navigate('PerfilUsuario');
        })
        .catch(err => console.log('Erro update perfil', err));
        /*
        Esse refresh faz com que as alterações sejam alteradas na sessão, ou seja,
        não precisa sair e voltar no app para que elas tenham efeito.
        */
        refresh(token, edicao);
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
                <TouchableOpacity onPress={()=>setSanfBasicos(!isSanfBasicos)}>
                    <View style={styles.sanfona} >
                        <Text style={styles.titulo} >Dados Básicos</Text>
                        <Ionicons name={isSanfBasicos ? 'md-chevron-down' : 'md-chevron-up' } size={20} />
                    </View>
                </TouchableOpacity>
                    {
                        !isSanfBasicos && <>
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
                            <Picker 
                            style={styles.pickerInput} 
                            dropdownIconColor='white'
                            selectedValue={edicao.sexo}
                            onValueChange={(value, index) =>{
                                if(value == null)
                                    alert('Selecione um valor!');
                                else 
                                    setEdObj('sexo', value);
                            
                            }
                            }>
                                <Picker.Item label='Masculino' value='MASC'/>
                                <Picker.Item label='Feminino' value='FEMN'/>
                                <Picker.Item label='Outro/Não Binário' value='OUTR'/>
                            </Picker>
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
                        </>
                    }

                    <TouchableOpacity onPress={()=>setSanfLocalizacao(!isSanfLocalizacao)}>
                        <View style={styles.sanfona} >
                            <Text style={styles.titulo} >Dados De Localização</Text>
                            <Ionicons name={isSanfLocalizacao ? 'md-chevron-down' : 'md-chevron-up' } size={20} />
                        </View>
                    </TouchableOpacity>
                    {
                        !isSanfLocalizacao && <>
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
                            <Picker 
                            style={styles.pickerInput} 
                            dropdownIconColor='white'
                            selectedValue={edicao.uf}
                            onValueChange={(value, index) =>{
                                if(value == null)
                                    alert('Selecione um valor!');
                                else 
                                    setEdObj('uf', value);
                            
                            }
                            }>
                                <Picker.Item label="Selecione..." value={null} />
                                <Picker.Item label="AC" value="AC" />
                                <Picker.Item label="AL" value="AL" />
                                <Picker.Item label="AP" value="AP" />
                                <Picker.Item label="AM" value="AM" />
                                <Picker.Item label="BA" value="BA" />
                                <Picker.Item label="CE" value="CE" />
                                <Picker.Item label="DF" value="DF" />
                                <Picker.Item label="ES" value="ES" />
                                <Picker.Item label="GO" value="GO" />
                                <Picker.Item label="MA" value="MA" />
                                <Picker.Item label="MG" value="MG" />
                                <Picker.Item label="MS" value="MS" />
                                <Picker.Item label="MT" value="MT" />
                                <Picker.Item label="PA" value="PA" />
                                <Picker.Item label="PB" value="PB" />
                                <Picker.Item label="PE" value="PE" />
                                <Picker.Item label="PI" value="PI" />
                                <Picker.Item label="PR" value="PR" />
                                <Picker.Item label="RJ" value="RJ" />
                                <Picker.Item label="RO" value="RO" />
                                <Picker.Item label="RR" value="RR" />
                                <Picker.Item label="RS" value="RS" />
                                <Picker.Item label="SC" value="SC" />
                                <Picker.Item label="SE" value="SE" />
                                <Picker.Item label="SP" value="SP" />
                                <Picker.Item label="TO" value="TO" />
                            </Picker>
                        </View>
                        
                    
                        </>
                    }
                    <View>
                        <View style={styles.filtros_container} >
                            <Text style={styles.conteudo} >
                                foto_perfil
                            </Text>
                        </View>
                        <Button title='Escolher' onPress={pickImage} />
                        <Image source={{uri: 'data:image/jpeg;base64,' + edicao.foto_perfil }} style={styles.foto_perfil}/>
                    </View>
                    
                <View style={styles.filtros_container}>
                    <Button title='Salvar' onPress={()=>{
                        let ed = JSON.parse(JSON.stringify(edicao));
                        delete ed.foto_perfil;
                        console.log(ed);
                        editarPerfil();
                    }} />
                    <Button title='Cancelar' onPress={()=>navigation.goBack()} />
                </View>


            </View>
        </ScrollView>
    );
}


export default EditarPerfil;