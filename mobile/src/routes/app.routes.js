import { React } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Dashboard/Home';
import Publicacao from '../pages/Content/Publicacao';
import PerfilInst from '../pages/Inst/PerfilInst';
import ResultScreen from '../pages/Dashboard/ResultScreen';

const AppStack = createNativeStackNavigator();
export default function AppRoutes(){
    return (
        <AppStack.Navigator>
            <AppStack.Screen name='Home' component={Home} />
            <AppStack.Screen name='Publicacao' component={Publicacao} />
            <AppStack.Screen name='ResultScreen' component={ResultScreen} />
            <AppStack.Screen name='PerfilInst' component={PerfilInst} />
        </AppStack.Navigator>
    );
}