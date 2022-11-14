import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, TouchableOpacity, Pressable, Image } from 'react-native';

import AuthContext from '../../contexts/auth';

import styles from '../styles';
import logo from '../../assets/logo.png';

function Login({route, navigation}){

    
    const [isLoading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState({
        email: '',
        senha: '',
        login: ''
    });
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { login } = useContext(AuthContext);

    function handleLogin(){

        
       login(email, senha);
        
    }

    return (
        
        <View style={styles.container}>

            <Image
                source={logo}
                style={styles.logo}
            />
            <Text style={styles.titulo}>Bem vindo ao Mundo!</Text>
            
            <View>
                <Text style={styles.conteudo} >E-Mail</Text>
                <TextInput style={styles.input} placeholder='exemplo@mail.com' onChangeText={(email)=>setEmail(email)} />
                <Text style={styles.conteudo}>{errMsg[0]}</Text>
            </View>
            <View>
                <Text style={styles.conteudo} >Senha</Text>
                <TextInput style={styles.input} onChangeText={(senha)=>setSenha(senha)} />
                <Text>{errMsg[1]}</Text>
            </View>
            <View>
                <Pressable style={styles.botao} onPress={()=>handleLogin()}>
                    <Text style={styles.bt_label}>Login</Text>
                </Pressable>
                <Text style={styles.conteudo} >{errMsg.login}</Text>
            </View>
            <View style={{margin:20}} >
                <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')} >
                    <Text style={styles.subtexto} >Não tem conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
            
        </View>

    )

}

export default Login;
