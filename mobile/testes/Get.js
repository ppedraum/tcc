import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';

function Get(){

    function getPessoas(){
        fetch('http://localhost:3001/pessoas')
        .then(res => {
            console.log(res.headers);
            console.log(res.status);
            return res.json();
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
        ;
    }


    return(
        <View>
            <Button title='GET' onPress={getPessoas} />
        </View>
    );
}

export default Get;