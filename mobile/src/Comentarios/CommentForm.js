import React, {useState} from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from './CommStyles.json';



export default function CommentForm({submitLabel, handleSubmit}) {
    const [text, setText] = useState('');
    return (

            <View>
                <TextInput placeholder='Write a comment' 
                multiline='true' 
                numberOfLines={5} 
                style={styles.comment_form_textarea}
                onChangeText={(text)=>setText(text)} />

                <Button style={styles.comment_form_button} title={submitLabel} onPress={()=>{}} />
            
            </View>

    );
}
