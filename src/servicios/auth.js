import axios from 'axios';
import {baseURL} from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username, password)=>{
    try {
        var credenciales = { correo: username, clave: password};

        const response = await axios.post(`${baseURL}/users/auth`, 
        JSON.stringify(credenciales), 
        {headers: {'Content-Type': "application/json"}}
        );
        await AsyncStorage.setItem('token', response.data.token);
    } catch (e) {
        console.log("error: ", e);
    }
}

export const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
}