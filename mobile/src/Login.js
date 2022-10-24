import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '../styles'

function Login({navigation}){

    
    const [isLoading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

/*     useEffect(() =>
    {
        fetch('http://localhost:3001/usuarios')
        .then(res => res.json())
        .then(result => {
            setUsuarios(result)
            setLoading(false);
        })
    }
    ) */

    function login(){
        fetch('http://localhost:3001/usuarios', {
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
            if(result == 'error'){
                console.log('erro');
            }else{
                navigation.navigate('Home')
            }
        })

    }

    return (

        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                source={require('./src/assets/logo.svg')}
                />
            </View>

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
                <Button style={styles.btnlogin} 
                title='Login'
                color='#FAFA'
                onPress={()=>login()} 
                />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')} style={styles.btncadas}>
                <Text>Não poussui conta ? Cadastre-se</Text>
            </TouchableOpacity>
            
        </View>

    )

}

export default Login;
