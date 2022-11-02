import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,KeyboardAvoidingView, Button, TextInput, TouchableOpacity, Image } from 'react-native';

import AuthContext from '../../contexts/auth'

import styles from '../styles'

function Login({route, navigation}){

    
    const [isLoading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { login } = useContext(AuthContext);

    function handleLogin(){

        setErrMsg([]);
        login(email, senha);
        
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.container}>
                <View>
                    <Image
                    source={require('C:/xampp/htdocs/mobile/src/assets/logo.png')}
                    style={{width: 190, height: 60}}
                    />
                </View>
                    <Text style={styles.titulo}>Bem vindo ao Mundo!</Text>
                    <View style={{paddingTop: 10,}}>
                        <Text style={{color:'white'}}>E-Mail</Text>
                        <TextInput style={styles.input} placeholder='exemplo@mail.com' onChangeText={(email)=>setEmail(email)} />
                        <Text>{errMsg[0]}</Text>
                    </View>
                    <View>
                        <Text style={{color:'white'}}>Senha</Text>
                        <TextInput style={styles.input} onChangeText={(senha)=>setSenha(senha)} />
                        <Text>{errMsg[1]}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.botao}
                            onPress={()=>handleLogin()}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{margin:20}} >
                        <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')} >
                            <Text>
                                <Text style={{color:'white'}}>Não tem uma conta?</Text>
                                <Text style={{fontWeight: "bold", color:'white'}}> Cadastre-se</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </KeyboardAvoidingView>

        
    )

}

export default Login;
