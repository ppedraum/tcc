import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from './src/Feed';
import Cadastro from './src/Cadastro';
import Login from './src/Login';
import Home from './src/Home';

import styles from './styles';


const Stack = createNativeStackNavigator();
function App() {
  return (
    <>
        <StatusBar/>
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName='Login'
            >
                <Stack.Screen name='Login' component={Login} 
                options={{headerShown:false}}
                />
                <Stack.Screen name='Cadastro' component={Cadastro} 
                options={{headerShown:false}}
                />
                <Stack.Screen name='Home' component={Home} 
                options={{headerShown:false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </>
    
  );
}

export default App;
