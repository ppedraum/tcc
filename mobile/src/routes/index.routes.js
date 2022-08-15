import { React, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import AuthContext from '../contexts/auth';
import styles from '../pages/styles';


export default function Routes(){

    const { isSigned, isLoading } = useContext(AuthContext);

    /*
    A boolean isSigned determina qual rota vamos utilizar, basicamente:
    Se o usuario estiver logado (signed = true) a rota é AppRoutes,
    senão (signed = false) a rota é AuthRoutes

    (Assim não precisamos ter a dor de cabeça de conseguir passar para a
    função login o navigation, salvar o navigation num context, etc.

    Além de ser muito mais clean, visível e profissional)
    */

    if(isLoading){
        return <View style={styles.container} ><ActivityIndicator size='large' color='blue'/></View>
    }

    if(isSigned === 'true'){
        return <AppRoutes/>
    }
    else{
        return <AuthRoutes/>
    }
}