import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, TouchableOpacity } from 'react-native';

import AuthContext from '../../contexts/auth'

import styles from '../styles'

function Login({navigation}){

    
    const [isLoading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { login } = useContext(AuthContext);

    function handleLogin(){
        login(email, senha);
    }

    return (
        
        <View style={styles.container}>
            
            <Text style={styles.titulo}>Olá!</Text>
            <View>
                <Text>E-Mail</Text>
                <TextInput style={styles.input} placeholder='exemplo@mail.com' onChangeText={(email)=>setEmail(email)} />
            </View>
            <View>
                <Text>Senha</Text>
                <TextInput style={styles.input} value={senha} onChangeText={(senha)=>setSenha(senha)} />
            </View>
            <View>
                <Text>{errMsg}</Text>
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
