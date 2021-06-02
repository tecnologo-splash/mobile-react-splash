import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilReducer = (state,action) => {
    switch(action.type){
        case 'getInfo':
            return {...state, currentUser: action.payload.userInfo};
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'cambiarFecha':
            return {...state, fechaNac: action.payload.date};
        default:
            return state;
    }
}

function getToken(){
    return AsyncStorage.getItem("tokenSplash");
}

const getInfo = (dispatch) => async () =>{
    
    try {
        const response = await settings.get('/users/info', {headers: {'Content-Type': "application/json"}} );

        dispatch({type: 'getInfo', payload: {userInfo:response.data}});
        console.log(response.data);

    } catch (e) {
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const cambiarValor = (dispatch) => ({variable, valor}) =>{
    dispatch({type: "cambiarValor", payload: {variable, valor}});
}

const cambiarFecha = (dispatch) => (date) =>{
    dispatch({type: "cambiarFecha",payload:{date}});
}

const initialState = {
    currentUser: {},
    nombre: "",
    apellido: "",
    fechaNac: new Date(),
    biografia:""
}

export const {Context, Provider} = crearContext(
    PerfilReducer,
    {getInfo, cambiarValor, cambiarFecha},
    initialState
);