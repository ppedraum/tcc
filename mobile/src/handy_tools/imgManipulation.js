import utf8 from 'utf8';
import base64 from "react-native-base64";

export default function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));    
    bytes.forEach((b) => binary += String.fromCharCode(b));
    bytes = utf8.encode(bytes);   
    return base64.encode(binary);
};
