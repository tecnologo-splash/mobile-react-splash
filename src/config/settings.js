import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
const api = () => {
    return axios.create({baseURL: "https://tecnologo-splash-api.herokuapp.com"});
}

export default axios.create({baseURL: "https://tecnologo-splash-api.herokuapp.com"});
*/

const instance = axios.create({
    baseURL: "https://tecnologo-splash-api.herokuapp.com"
})

instance.interceptors.request.use(
    async (config)=>{
        const token = await AsyncStorage.getItem('tokenSplash');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
)

export default instance;