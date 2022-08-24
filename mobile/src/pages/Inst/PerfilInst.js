import { React } from 'react';
import { Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-web';

function PerfilInst({navigation}){
    return(
        <View>
            <ActivityIndicator size='large' color='blue'/>
        </View>
    );
}