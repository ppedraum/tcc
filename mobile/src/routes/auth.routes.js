import { React } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/SignIn/Login';
import Cadastro from '../pages/SignIn/Cadastro';

const AuthStack = createNativeStackNavigator();
export default function AuthRoutes(){
    return (
        <AuthStack.Navigator
        screenOptions={{headerShown:false}}
        >
            <AuthStack.Screen name='Login' component={Login} />
            <AuthStack.Screen name='Cadastro' component={Cadastro} />
        </AuthStack.Navigator>
    );
}