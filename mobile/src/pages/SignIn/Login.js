import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

import AuthContext from '../../contexts/auth'

import styles from '../styles'

function Login({navigation}){

    
    const [isLoading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { signed } = useContext(AuthContext);

    function login(){
        fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                e_mail: email,
                senha: senha
            })
        })
        .then(res => res.json())
        .then(result=>{
            if(result.error != null){
                setErrMsg('O usuário não foi encontrado!');
            }else{
                setErrMsg(result.usuario.nome);
                console.log(signed)
                /* navigation.navigate('Home') */
            }
        })

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
                <Button title='Login' onPress={()=>login()} />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')} ><Text>Não tem conta? Cadastre-se</Text></TouchableOpacity>
            
        </View>

    )

}

export default Login;
