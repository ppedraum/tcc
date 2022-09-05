//Nosso contexto para a autenticação
/*
O context basicamente serve para gravar informações necessárias para vários componentes,
como tokens de autenticação.

Podemos então envolver a parte que queremos que tenha essas informações com o Context.Provider,
onde todos os componentes herdam-nas.
*/


import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//criando o contexto e dizendo qual o formato dele (atributos que vão ser passados para ele)
//O que é passado na função não é o valor default, mas sim o formato dos atributos dela.
//Bom para que o react entenda quais são os attrs
const AuthContext = createContext({
    isSigned:'false', 
    usuario:{}, 
    login:()=>{},
    logout:()=>{},
    isLoading:true,
    token:'',
    NODE_PORT: '',
});


/*
Provider -> Provê as informações daquele contexto
Exportamos o Provider com o parâmetro children, que recebe pelo react todos os componentes
que vão estar dentro desse componente, e assim repassamos normalmente os valores para lá
*/

const { NODE_PORT } = require('../../config/port.json');

export function AuthProvider({children}){

    /*
        O async storage é um sistema de armazenamento de dados local. Com ele, podemos dizer
    quais dados são salvos para serem utilizados mesmo depois de reloads de página.
        As funções são assíncronas, porém algumas retornam void, não precisando de await ou .then()

        .getItem(key) retorna o item salvo
        .setItem(key, value) salva um dado
        .clear() remove todos os dados

    */

    useEffect(()=>{
        async function getStoragedData(){
            const storagedUsuario = await AsyncStorage.getItem('@RNAuth:usuario');
            const storagedSigned = await AsyncStorage.getItem('@RNAuth:is_signed');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
            
            if(storagedUsuario && storagedToken && storagedSigned ){
                setUsuario(JSON.parse(storagedUsuario));
                setSigned(storagedSigned);
                setToken(storagedToken);
            }
        }
        getStoragedData();
        setLoading(false);
    }, [])

    const [isSigned, setSigned] = useState('false')
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    /*
    Movemos a responsabilidade do login para o contexto, para assim 
    mandá-lo pelo AuthProvider
    */
    function login(email, senha){
        fetch( NODE_PORT + '/auth/login', {
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
                console.log('O usuário não foi encontrado!');
            }else{
                console.log('ok')
                setSigned('true');
                setUsuario(result.usuario);
                setToken(result.token)
                AsyncStorage.setItem('@RNAuth:usuario', JSON.stringify(result.usuario));
                AsyncStorage.setItem('@RNAuth:is_signed', isSigned);
                AsyncStorage.setItem('@RNAuth:token', result.token);
            }
        })
        .catch(err=>{
            alert(err);
        })
        ;
    
    }

    /*
    O logout apenas troca o isSigned de true pra false e o usuário fica nulo, assim no nosso componente
    index.routes.js, como isSigned é false, troca da rota do App para a rota de Autenticação

    dá clear no asyncStorage
    */

    function logout(){
        AsyncStorage.clear().then(()=>{
            setSigned('false');
            setUsuario(null);
        });
    }

    return (
        <AuthContext.Provider value={{isSigned, usuario, login, logout, isLoading, token, NODE_PORT }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;