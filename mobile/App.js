import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, LogBox } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/index.routes';

import { AuthProvider } from './src/contexts/auth';

//Async Storage serve apenas para gravar informações no refresh da pag, não usar para autenticação

//LogBox.ignoreAllLogs(); -> Para a apresentacao
function App() {
  return (
    <>
        <StatusBar/>
        {/*
        O próprio NavigationContainer usa Context para possibilitar que as rotas tenham as informações
        necessárias para serem navegadas
        */}
        <NavigationContainer>
            {/*
            Passando nosso Provider do AuthContext para autenticação das rotas
            */}
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </NavigationContainer>
    </>
    
  );
}

export default App;
