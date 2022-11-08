import { ReactComponentElement, useContext } from 'react';
import {View, Text} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './Feed';
import PerfilUsuario from './PerfilUsuario';
import ReqVoluntariado from './ReqVoluntariado'
import Inscricoes from './Inscricoes';

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
                height:'9%',
                backgroundColor: '#004475'
            }
        }}
        >
            <Bttn.Screen name='Feed' component={Feed} 
            options={{
                tabBarIcon: home => {return(
                    <Ionicons
                    name="md-home"
                    size={45}
                    color="#fff"
                    />
                )}
            }}
            />
            {/*tirar ponto de exclamação*/}
{/*             {
                usuario.is_voluntario?
                <Bttn.Screen name='ReqVoluntariado' component={ReqVoluntariado} 
                options={{
                    tabBarIcon: home => {return(
                        <Ionicons
                        name="hand-left"
                        size={28}
                        color="#3F3F3F"
                        />
                    )}
                }}
                />
                :
                null

            } */}
            <Bttn.Screen name='PerfilUsuario' component={PerfilUsuario} 
            options={{
                tabBarIcon : home => {return(
                    <Ionicons
                    name="md-person"
                    size={45}
                    color="#fff"
                    />
                )},
                lazy : false
            }}
            />
            <Bttn.Screen name='Inscricoes' component={Inscricoes} 
            options={{
                tabBarIcon : home => {return(
                    <Ionicons
                    name="md-person"
                    size={28}
                    color="#3F3F3F"
                    />
                )},
                lazy : false
            }}
            />
            

        </Bttn.Navigator>
        </>
    );
}