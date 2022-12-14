import { React } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Dashboard/Home';
import Publicacao from '../pages/Content/Publicacao';
import PerfilInst from '../pages/Inst/PerfilInst';
import ResultScreen from '../pages/Dashboard/ResultScreen';
import PerfilUsuario from '../pages/Dashboard/PerfilUsuario';
import EditarPerfil from '../pages/Dashboard/EditarPerfil';

const AppStack = createNativeStackNavigator();
export default function AppRoutes(){
    return (
        <AppStack.Navigator screenOptions={
            {
                headerStyle: {
                    backgroundColor: '#004475',
                    height: 350
                  },
                  headerTintColor: '#D0EBFF',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
            }
        } >
            <AppStack.Screen name='Home' component={Home} />
            <AppStack.Screen name='Publicacao' component={Publicacao} />
            <AppStack.Screen name='ResultScreen' component={ResultScreen} />
            <AppStack.Screen name='PerfilInst' component={PerfilInst} />
            <AppStack.Screen name='EditarPerfil' component={EditarPerfil} />
        </AppStack.Navigator>
    );
}