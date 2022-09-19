import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, ScrollView } from 'react-native';
import styles from '../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
function Cadastro({navigation}){

    const [ nome, setNome] = useState('');
    const [ email, setEmail] =  useState('');
    const [ senha, setSenha] = useState('');
    const [ telefone, setTelefone] = useState('');
    const [ datanasc, setDatanasc] = useState('');
    const [ sexo, setSexo] = useState('');
    const [ profissao, setProfissao] = useState('');
    const [ cidade, setCidade] = useState('');
    const [ uf, setUf] = useState('');
    const [ cpf, setCpf] = useState('');
    const [ fotoperfil, setFotoperfil] = useState('');
    const [ isvoluntario, setIsvoluntario] = useState('');

    function CadastroBasico({navigation}){
        return (
        <View style={styles.container}>       
            <View>
                <Text>nome</Text>
                <TextInput style={styles.input} onChangeText={(nome)=>setNome(titulo)} />
            </View>
            <View>
                <Text>e-mail</Text>
                <TextInput style={styles.input} onChangeText={(email)=>setEmail(email)} />
            </View>
            <View>
                <Text>senha</Text>
                <TextInput style={styles.input} onChangeText={(senha)=>setSenha(senha)} />
            </View>
        <Button onPress={()=>navigation.navigate('CadastroDados')}  title='Seguinte'/>
        </View> 
        );
    }

    function CadastroDados({navigation}){
        return (
            <ScrollView  >
                <View>
                    <Text>telefone</Text>
                    <TextInput style={styles.input} onChangeText={(telefone)=>setTelefone(telefone)} />
                </View>
                <View>
                    <Text>data de nascimento</Text>
                    <TextInput style={styles.input} onChangeText={(datanasc)=>setDatanasc(datanasc)} />
                </View> 
                <View>
                    <Text>Sexo</Text>
                    <TextInput style={styles.input} onChangeText={(datanasc)=>setDatanasc(datanasc)} />
                </View>
                <View>
                    <Text>profissao</Text>
                    <TextInput style={styles.input} onChangeText={(profissao)=>setProfissao(profissao)} />
                </View>
                <View>
                    <Text>cidade</Text>
                    <TextInput style={styles.input} onChangeText={(cidade)=>setCidade(cidade)} />
                </View>
                <View>
                    <Text>UF</Text>
                    <TextInput style={styles.input} onChangeText={(uf)=>setUf(uf)} />
                </View>
                <View>
                    <Text>CPF</Text>
                    <TextInput style={styles.input} onChangeText={(cpf)=>setCpf(cpf)} />
                </View>
                <View>
                    <Text>Foto de Perfil</Text>
                    <TextInput style={styles.input} onChangeText={(fotoPerfil)=>setFotoperfil(fotoPerfil)} />
                </View>
                <View>
                    <Text>Você é um profissional voluntário?</Text>
                    <TextInput style={styles.input} onChangeText={(isvoluntario)=>setIsvoluntario(isvoluntario)} />
                </View>
                <Button onPress={()=>navigation.navigate('Login')}  title='Completar Iscrição'/>
            </ScrollView>
        );
    }
    


/*     function cadastrar(){
        fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome : nome,
                e_mail : email,
                senha : senha,
                telefone : telefone,
                data_nasc : datanasc,
                sexo : sexo,
                profissao : profissao,
                cidade : cidade,
                uf : uf,
                cpf : cpf,
                foto_perfil : fotoperfil,
                is_voluntario : isvoluntario,
            })
        }).then(res => res.json())
        .then(res=>console.log(res))
        .catch(err => console.log(err))
        ;
    }     */

    return (
        <Stack.Navigator
        initialRouteName='CadastroBasico'
        >
            <Stack.Screen name='CadastroBasico' component={CadastroBasico} 
            options={
                {headerShown:false}
            }
            />
            <Stack.Screen name='CadastroDados' component={CadastroDados}

            />
        </Stack.Navigator>
    );
}

export default Cadastro;