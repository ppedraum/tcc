import { ReactComponentElement, useContext } from 'react';
import {View, Text} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './Feed';
import PerfilUsuario from './PerfilUsuario';

import AuthContext from '../../contexts/auth';

const Bttn = createBottomTabNavigator();

export default function Home({navigation}){

    const { usuario } = useContext(AuthContext);

    return(
        <>
        <Bttn.Navigator
        screenOptions={{
            headerShown:false,
            tabBarStyle:{
                height:'10%',
            }
        }}
        >
            <Bttn.Screen name='Feed' component={Feed} 
            options={{
                tabBarIcon: home => {return(
                    <Ionicons
                    name="md-home"
                    size={28}
                    color="#3F3F3F"
                    />
                )}
            }}
            />
            <Bttn.Screen name='PerfilUsuario' component={PerfilUsuario} 
            options={{
                tabBarIcon: home => {return(
                    <Ionicons
                    name="md-person"
                    size={28}
                    color="#3F3F3F"
                    />
                )}
            }}
            />

        </Bttn.Navigator>
        </>
    );
}

//Navegação vara a aba de voluntariado

/* {usuario.is_voluntario ? 
<Bttn.Screen name='PerfilUsuario' component={PerfilUsuario} 
options={{
    tabBarIcon: home => {return(
        <Ionicons
        name="md-person"
        size={28}
        color="#3F3F3F"
        />
    )}
}}
/> :
null
} */