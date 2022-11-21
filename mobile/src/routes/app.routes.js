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
        <AppStack.Navigator
        screenOptions={{
            headerTitleStyle: {
                color: 'white'
            },
            headerStyle:{
                height:'9%',
                backgroundColor: '#004475',

            }
        }}>
            <AppStack.Screen name='Home' component={Home}
            options={
                {
                    headerShown: false
                 }
            }
            />
            <AppStack.Screen name='Publicacao' component={Publicacao}
            options={{
                title:'Publicação'
            }}
            />
            <AppStack.Screen name='ResultScreen' component={ResultScreen} />
            <AppStack.Screen name='PerfilInst' component={PerfilInst}
            options={{
                title:'Perfil Instituição'
            }}           
            />
            <AppStack.Screen name='EditarPerfil' component={EditarPerfil} 
            options={{
                title:'Editar Perfil'
            }} 
            />
        </AppStack.Navigator>
    );
}