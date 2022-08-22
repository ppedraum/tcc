import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, ScrollView, KeyboardAvoidingView, Image, Platform } from 'react-native';
import { RNDateTimePicker, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import mime from "mime";

import styles from '../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function cadastrar(nome, e_mail, senha, telefone, data_nasc, sexo, profissao, cidade, uf, cpf, foto_perfil, is_voluntario){

    /* function handleCadastro(){
        let regSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        if(!regSenha.test(senha)){
            console.log('senha inválida')
        }
    } */
    
    const createFormData = (foto_perfil, body = {}) => {
        const data = new FormData();
        
        fotoUri = Platform.OS === 'ios' ? foto_perfil.uri.replace('file://', '') : foto_perfil.uri

        data.append('foto_perfil', {
          name: fotoUri.split('/').pop,
          type: mime.getType(fotoUri),
          uri: fotoUri
        });
      
        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
      
        return data;
      };

    fetch('http://192.168.0.111:3001/auth/cadastro', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: createFormData(foto_perfil, {
            nome : nome,
            e_mail : e_mail,
            senha : senha,
            telefone : telefone,
            data_nasc : data_nasc,
            sexo : sexo,
            profissao : profissao,
            cidade : cidade,
            uf : uf,
            cpf : cpf,
            is_voluntario : is_voluntario,
        })

    }).then(res => res.json())
    .then(res=>console.log(res))
    .catch(err => console.log(err))
    ;
}

function CadastroBasico({navigation}){
    const [ nome, setNome] = useState('');
    const [ e_mail, setEmail] =  useState('');
    const [ senha, setSenha] = useState('');
    /* const [errMsg, setErrMsg] = useState([]) */
    
    // regex senha ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    return (
    <View style={styles.container}>       
        <View>
            <Text>nome</Text>
            <TextInput style={styles.input} onChangeText={(nome)=>setNome(nome)} />
        </View>
        <View>
            <Text>e-mail</Text>
            <TextInput style={styles.input} onChangeText={(e_mail)=>setEmail(e_mail)} />
        </View>
        <View>
            <Text>senha</Text>
            <TextInput style={styles.input} onChangeText={(senha)=>setSenha(senha)} />
        </View>
        <Button onPress={()=>
            navigation.navigate('CadastroDados', {
                nome:nome,
                e_mail:e_mail,
                senha:senha

            })}
        title='Seguinte'/>
    </View> 
    );
}

function CadastroDados({ route, navigation }){

    const { nome, e_mail, senha } = route.params;
    const [ telefone, setTelefone] = useState('');
    const [ data_nasc, setDatanasc] = useState(new Date(2022, 1, 1));
    const [ sexo, setSexo] = useState('');
    const [ profissao, setProfissao] = useState('');
    const [ cidade, setCidade] = useState('');
    const [ uf, setUf] = useState('');
    const [ cpf, setCpf] = useState('');
    const [ foto_perfil, setFotoperfil] = useState(null);
    const [ is_voluntario, setIsvoluntario] = useState(false);
    /* const [errMsg, setErrMsg] = useState([]); */

    function showDatePicker(){
        DateTimePickerAndroid.open({
            value: data_nasc,
            onChange: (event, date)=>{
                setDatanasc(date);
            },
          });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setFotoperfil(result);
        }
      };



    return (
        
        <ScrollView contentContainerStyle={styles.scrollContainer} >
            <KeyboardAvoidingView>
            <View>
                <Text>telefone</Text>
                <TextInput style={styles.input} onChangeText={(telefone)=>setTelefone(telefone)} />
            </View>
            <View>
                <Text>data de nascimento</Text>
                <Button title='Selecione...' onPress={()=>showDatePicker()}/>
                <Text>{data_nasc.toISOString()}</Text>
            </View> 
            <View>
                <Text>Sexo</Text>
                <Picker
                style={styles.pickerInput} 
                dropdownIconColor='white'
                selectedValue={sexo}
                onValueChange={(value, index) =>{
                    if(value == null){
                        alert('Selecione um valor!')
                    }else setSexo(value)
                    
                }
                }>
                    <Picker.Item label="Selecione..." value={null} />
                    <Picker.Item label="Masculino" value="MASC" />
                    <Picker.Item label="Feminino" value="FEMN" />
                    <Picker.Item label="Outro" value="OUTR" />
                </Picker>
            </View>
            <View>
                <Text>Profissão</Text>
                <TextInput style={styles.input} onChangeText={(profissao)=>setProfissao(profissao)} />
            </View>
            <View>
                <Text>Cidade</Text>
                <TextInput style={styles.input} onChangeText={(cidade)=>setCidade(cidade)} />
            </View>
            <View>
                <Text>UF</Text>
                <Picker 
                style={styles.pickerInput} 
                dropdownIconColor='white'
                selectedValue={uf}
                onValueChange={(value, index) =>{
                    if(value == null){
                        alert('Selecione um valor!')
                    }else setUf(value)
                
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
            <View>
                <Text>CPF</Text>
                <TextInput style={styles.input} onChangeText={(cpf)=>setCpf(cpf)} />
            </View>
            <View>
                <Text>Foto de Perfil</Text>
                <Button title='escolha' onPress={pickImage} />
                {foto_perfil && <Image source={{ uri: foto_perfil.uri }} style={{ width: 200, height: 200 }} />}

            </View>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                <Text>Você é um profissional voluntário?</Text>
                <Checkbox
                status={is_voluntario ? 'checked' : 'unchecked'}
                onPress={() => {
                    setIsvoluntario(!is_voluntario);
                }}
                />
            </View>
            <Button onPress={()=>{
                cadastrar(nome, e_mail, senha, telefone, data_nasc, sexo, profissao, cidade, uf, cpf, foto_perfil, is_voluntario)
                console.log('cadastrado!');
                navigation.navigate('Login');

            }}  title='Completar Iscrição'/>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}


const Stack = createNativeStackNavigator();
function Cadastro({navigation}){



    return (
        <Stack.Navigator
        initialRouteName='CadastroBasico'
        >
            <Stack.Screen name='CadastroBasico' component={CadastroBasico} 
            />
            <Stack.Screen name='CadastroDados' component={CadastroDados}
            />
        </Stack.Navigator>
    );
}

export default Cadastro;