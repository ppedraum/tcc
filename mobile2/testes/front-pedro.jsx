import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState } from 'react';
import base64 from 'react-native-base64';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export default function App() {
  const [foto, setfoto] = useState(null);
  const [fotoBase, setfotoBase] = useState('');
  const [resultado, setresultado] = useState('');

  async function addUser() {
    const url = 'http://127.0.0.1:3000/user'
    try {
      const res = await axios.post(url, {
        id: '333',
        name: 'funcionou',
        foto: fotoBase
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  async function getUser() {
    const url = 'http://127.0.0.1:3000/user'
    axios.get(url)
      .then(response => {
        console.log(response.data)
        console.log(response.data[4].foto)
        var teste = base64.decode(response.data[5].foto)
        setresultado(teste)
        console.log('resultado', teste)
      })
      .catch(error => console.log(error))
      
    }
    
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    var teste = await base64.encode(result.uri);
    setfotoBase(teste);
    console.log('aaa', fotoBase);
    console.log('a', result);

    if (!result.cancelled) {
      setfoto(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="manda" onPress={addUser} />
      <Button title="pega" onPress={getUser} />
      {foto && <Image source={{ uri: foto }} style={{ width: 200, height: 200 }} />}
      <Image source={{ uri: resultado }} style={{ width: 500, height: 500 }}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
