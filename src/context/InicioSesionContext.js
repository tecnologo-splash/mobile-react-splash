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
        case 'cerrarSesion':
            return {...state, token: null, usuario: '', password:'', error:null};
        default:
            return state;
    }
}

const inicioSesion = (dispatch) => async ({usuario, password}) =>{

    if(usuario.includes("@")){
        var credenciales = { correo: usuario, clave: password};
    }else{
        var credenciales = { usuario: usuario, clave: password};
    }

    try {
        const response = await settings.post('/users/auth', 
        JSON.stringify(credenciales), 
        {headers: {'Content-Type': "application/json"}}
        );

        await AsyncStorage.setItem('tokenSplash', response.data.token);
        dispatch({type: 'inicioSesion', payload: {token:response.data.token}});
        console.log(response.data.token);

    } catch (e) {
        dispatch({type: 'onError', payload: {error: e}});
    }
    
}

const cambiarValor = (dispatch) => ({variable,valor}) =>{
    dispatch({type: 'cambiarValor', payload: {variable, valor}})
}

const actualizarToken = (dispatch) => async() =>{
    const tokenStorage = await AsyncStorage.getItem('tokenSplash');
    if(tokenStorage){
        dispatch({type: 'cambiarValor', payload: {variable: 'token', valor: tokenStorage}});
    }
}

const cerrarSesion = (dispatch) => async () =>{
    dispatch({type: 'cerrarSesion'});
    await AsyncStorage.removeItem('tokenSplash');
}
export const {Context, Provider} = crearContext(
    InicioSesionReducer,
    {inicioSesion, cambiarValor, actualizarToken, cerrarSesion},
    {usuario: '', password:'', error:'', token:''}
);