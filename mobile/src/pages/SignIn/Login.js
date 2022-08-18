import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, TouchableOpacity } from 'react-native';

import AuthContext from '../../contexts/auth'

import styles from '../styles'

function Login({route, navigation}){

    
    const [isLoading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { login } = useContext(AuthContext);

    function handleLogin(){
        let arr = [];
        let reEmail = /\S+@\S+\.\S+/;

        if(!reEmail.test(email)){
            arr.push('E-Mail Inválido!')
            console.log(arr)
            setErrMsg(arr);
        }else
            setErrMsg([])
            login(email, senha);
    }

    return (
        
        <View style={styles.container}>
            
            <Text style={styles.titulo}>Olá!</Text>
            <View>
                <Text>E-Mail</Text>
                <TextInput style={styles.input} placeholder='exemplo@mail.com' onChangeText={(email)=>setEmail(email)} />
                <Text>{errMsg[0]}</Text>
            </View>
            <View>
                <Text>Senha</Text>
                <TextInput style={styles.input} onChangeText={(senha)=>setSenha(senha)} />
                <Text>{errMsg[1]}</Text>
            </View>
            <View>
                <Button title='Login' onPress={()=>handleLogin()} />
            </View>
            <View style={{margin:20}} >
                <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')} ><Text>Não tem conta? Cadastre-se</Text></TouchableOpacity>
            </View>
            
        </View>

    )

}

export default Login;
