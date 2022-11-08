import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, ScrollView, KeyboardAvoidingView, Image, Platform, TouchableOpacity } from 'react-native';

import { RNDateTimePicker, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64';
var utf8 = require('utf8');

import styles from '../styles';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadContext, { CadProvider } from '../../contexts/cadastro';

const { NODE_PORT } = require('../../../config/port.json');

function CadastroBasico({navigation}){

    const { dados, setDado } = useContext(CadContext);

    return (
    <View style={styles.container}>  
   
        <View>
            <Text style={{color:'white'}}>Nome</Text>
            <TextInput style={styles.input} onChangeText={(nome)=>setDado('nome', nome)} />
        </View>
        <View>
            <Text style={{color:'white'}}>E-mail</Text>
            <TextInput style={styles.input} onChangeText={(e_mail)=>setDado('e_mail', e_mail)} />
        </View>
        <View>
            <Text style={{color:'white'}}>Senha</Text>
            <TextInput style={styles.input} onChangeText={(senha)=>setDado('senha', senha)} />
        </View>
        <View styles={styles.botao}>
        <TouchableOpacity style={styles.botao}
        onPress={()=>navigation.navigate('CadastroDados')}>
            <Text>Enviar</Text>
        </TouchableOpacity>
        </View>
    </View> 
    );
}

function CadastroDados({ navigation }){

    const { dados, setDado } = useContext(CadContext);
    const [foto, setFoto] = useState({});
    function HandleCadastro(){
        console.log('cadastro: ', dados)
        cadastrar();
        navigation.navigate('Login');
    }

    function cadastrar(){

        fetch(NODE_PORT + '/auth/cadastro', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome : dados.nome,
                e_mail : dados.e_mail,
                senha : dados.senha,
                telefone : dados.telefone,
                data_nasc : dados.data_nasc,
                sexo : dados.sexo,
                profissao : dados.profissao,
                cidade : dados.cidade,
                uf : dados.uf,
                cpf : dados.cpf,
                foto_perfil : dados.foto_perfil,
                is_voluntario : dados.is_voluntario,
            })
    
        })
        .then(res => console.log('status cadastro: ', res.status))
        .catch(err => console.log('Erro no cadastro: ' + err));
    }
   
    function showDatePicker(){
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange: (event, date)=>{
                setDado('data_nasc', date);
            },
          });
    }

    async function pickImage(){
        let foto = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
          base64: true
        });
        
        console.log('fotoBase: ' + foto.base64);
    
        if (!foto.cancelled) {
            setFoto(foto);
            setDado('foto_perfil', foto.base64);
        }
      };



    return (
        
        <ScrollView contentContainerStyle={styles.scrollContainer} >
            <KeyboardAvoidingView>
            <View>
                <Text style={{color:'white'}}>Telefone</Text>
                <TextInput style={styles.input} onChangeText={(telefone)=>setDado('telefone', telefone)} />
            </View>
            <View>
                <Text style={{color:'white'}}>Data de nascimento</Text>
                <TouchableOpacity 
                style={styles.botao} 
                onPress={()=>showDatePicker()}> 
                <Text>Selecione</Text>
                </TouchableOpacity>
                {/* <Text>{dados.data_nasc}</Text> */}
            </View> 
            <View>
                <Text style={{color:'white'}}>Sexo</Text>
                <Picker
                style={styles.pickerInput} 
                dropdownIconColor='white'
                selectedValue={dados.sexo}
                onValueChange={(value, index) =>{
                    if(value == null)
                        alert('Selecione um valor!');
                    else 
                        setDado('sexo', value);
                    
                }
                }>
                    <Picker.Item label="Selecione..." value={null} />
                    <Picker.Item label="Masculino" value="MASC" />
                    <Picker.Item label="Feminino" value="FEMN" />
                    <Picker.Item label="Outro" value="OUTR" />
                </Picker>
            </View>
            <View>
                <Text style={{color:'white'}}>Profissão</Text>
                <TextInput style={styles.input} onChangeText={(profissao)=>setDado('profissao', profissao)} />
            </View>
            <View>
                <Text style={{color:'white'}}>Cidade</Text>
                <TextInput style={styles.input} onChangeText={(cidade)=>setDado('cidade', cidade)} />
            </View>
            <View>
                <Text style={{color:'white'}}>UF</Text>
                <Picker 
                style={styles.pickerInput} 
                dropdownIconColor='white'
                selectedValue={dados.uf}
                onValueChange={(value, index) =>{
                    if(value == null)
                        alert('Selecione um valor!');
                    else 
                        setDado('uf', value);
                
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
                <Text style={{color:'white'}}>CPF</Text>
                <TextInput style={styles.input} onChangeText={(cpf)=>setDado('cpf', cpf)} />
            </View>
            <View>
                <Text style={{color:'white'}}>Foto de Perfil</Text>
                <TouchableOpacity style={styles.botao}
                    onPress={pickImage}>
                    <Text>Enviar</Text>
                    {dados.foto != '' && <Image source={{ uri: 'data:image/jpeg;base64,' + dados.foto_perfil }} />}
                </TouchableOpacity>

            </View>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                <Text style={{color:'white'}}>Você é um profissional voluntário?</Text>
                <Checkbox
                status={dados.is_voluntario ? 'checked' : 'unchecked'}
                onPress={() => {
                    setDado('is_voluntario', !dados.is_voluntario);
                }}
                />
            </View>
            <View style={{display:'flex', justifyContent: 'center', alignItems:'center'}}>
            <TouchableOpacity style={styles.botaoC}
            onPress={HandleCadastro}>
            <Text>Completar Cadastro</Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}


const Stack = createNativeStackNavigator();
function Cadastro({navigation}){



    return (
        <CadProvider>
            <Stack.Navigator
            screenOptions={{ headerTitleStyle: {
                color: 'white'
              },headerStyle: { backgroundColor: '#004475' } }}
            initialRouteName='CadastroBasico'
            >
                <Stack.Screen name='Cadastro Mundo' component={CadastroBasico} 
                />
                <Stack.Screen name='CadastroDados' component={CadastroDados}
                />
        </Stack.Navigator>
        </CadProvider>
        

    );
}

export default Cadastro;