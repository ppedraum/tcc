import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, TouchableOpacity, Image } from 'react-native';

import AuthContext from '../../contexts/auth';

import styles from '../styles'
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
        
        <View style={styles.containerlogin}>

            <Image
                source={logo}
                style={styles.logo}
            />
            
            <Text style={styles.titulologin}>Bem vindo ao MUNDO</Text>
            <View>
                <Text style={styles.conteudo}>E-Mail</Text>
                <TextInput style={styles.input} placeholder='exemplo@mail.com' onChangeText={(email)=>setEmail(email)} />
                <Text style={styles.conteudo}>{errMsg[0]}</Text>
            </View>
            <View>
                <Text style={styles.conteudo}>Senha</Text>
                <TextInput style={styles.input} 
                secureTextEntry={true}
                onChangeText={(senha)=>setSenha(senha)} />
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
                                <Text style={styles.conteudo}>Não tem uma conta?</Text>
                                <Text style={styles.conteudobold}> Cadastre-se</Text>
                            </Text>
                        </TouchableOpacity>
            </View>
            
        </View>

    )

}

export default Login;
