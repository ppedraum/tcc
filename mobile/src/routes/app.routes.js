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
                color: 'white',
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
                title:'Publicação',
                headerTintColor: '#fff',
            }}
            />
            <AppStack.Screen name='ResultScreen' component={ResultScreen}
            options={{
                title:'Pesquisar',
                headerTintColor: '#fff',
            }}
            />
            <AppStack.Screen name='PerfilInst' component={PerfilInst}
            options={{
                title:'Perfil Instituição',
                headerTintColor: '#fff',
            }}           
            />
            <AppStack.Screen name='EditarPerfil' component={EditarPerfil} 
            options={{
                title:'Editar Perfil',
                headerTintColor: '#fff',
            }} 
            />
        </AppStack.Navigator>
    );
}