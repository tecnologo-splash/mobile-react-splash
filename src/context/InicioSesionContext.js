import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InicioSesionReducer = (state,action) => {
    switch(action.type){
        case 'inicioSesion':
            return {...state, token: action.payload.token, error: ''};
        case 'onError':
            return {...state, error: action.payload.error}
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        default:
            return state;
    }
}

const inicioSesion = (dispatch) => async ({usuario, password}) =>{

    try {
        var credenciales = { correo: usuario, clave: password};

        const response = await settings.post('/users/auth', 
        JSON.stringify(credenciales), 
        {headers: {'Content-Type': "application/json"}}
        );

        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'inicioSesion', payload: {token:response.data.token}});
        console.log(response.data.token);

    } catch (e) {
        dispatch({type: 'onError', payload: {error: e}});
    }
    
}

const cambiarValor = (dispatch) => ({variable,valor}) =>{
    dispatch({type: 'cambiarValor', payload: {variable, valor}})
}

export const {Context, Provider} = crearContext(
    InicioSesionReducer,
    {inicioSesion, cambiarValor},
    {usuario: '', password:'', error:'', token:''}
);