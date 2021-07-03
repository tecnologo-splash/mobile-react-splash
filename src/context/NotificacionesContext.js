import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

const NotificacionesReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'onError':
            return {...state,  error: action.payload.error};
        case 'getConfigNotif':
            return {...state,  configNotif: action.payload.configNotif};
        default:
            return state;
    }
}

function getToken(){
    return AsyncStorage.getItem("tokenSplash");
}

const cambiarValor = dispatch => ({variable,valor})=> {
    dispatch({type: 'cambiarValor', payload: {variable, valor}});
}

const getConfigNotif = (dispatch) => async () =>{
    
    try {
        const response = await settings.get('/configuracion-notificaciones', {headers: {'Content-Type': "application/json"}} );

        dispatch({type: 'getConfigNotif', payload: {configNotif:response.data}});
    } catch (e) {
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const editarNotif = (dispatch) => async (newNotif)=> {
    try{
        console.log("en el contexto",newNotif)
        await settings.patch(`configuracion-notificaciones`, newNotif)
        
        dispatch({type: 'getConfigNotif', payload: {configNotif:newNotif}});
        dispatch({type:'onError', payload: {error: {titulo: 'Exito en editar perfil', cuerpo: 'Se ha actualizado su perfil', anterior: 'EditarPerfil', styleError: styles.success}}});

    }catch(e){
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo editar el perfil", activacion: null}}});
    }
}

const initialState = {
    error: {},
    configNotif: {},
}

export const {Context, Provider} = crearContext(
    NotificacionesReducer,
    { cambiarValor, getConfigNotif, editarNotif },
    initialState,
);


const styles = StyleSheet.create({
    error:{
        color: "red"
    },
    success:{
        color: "green"
    },
});