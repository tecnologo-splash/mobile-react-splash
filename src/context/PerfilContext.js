import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filtroSeguidos } from "../componentes/filtros";
import { StyleSheet } from 'react-native';

const PerfilReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'getSeguidores':
            return {...state, seguidores: action.payload.seguidores};
        case 'getSeguidos':
            return {...state, seguidos: action.payload.seguidos};
        case 'getInfo':
            return {...state, currentUser: action.payload.userInfo, biografia: action.payload.userInfo ? action.payload.userInfo.biografia : ""};
        case 'cambiarFecha':
            return {...state, fechaNac: action.payload.date};
        case 'onError':
            return {...state,  error: action.payload.error};
        case 'editarPerfil':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, styleError:null}};
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

const getInfo = (dispatch) => async () =>{
    
    try {
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        const response = await settings.get('/users/info', {headers: {'Content-Type': "application/json"}} );

        dispatch({type: 'getInfo', payload: {userInfo:response.data}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});

    } catch (e) {
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const cambiarFecha = (dispatch) => (date) =>{
    dispatch({type: "cambiarFecha",payload:{date}});
}

const getSeguidores = (dispatch) => async () =>{
    try{
        
        dispatch({type:'getSeguidores', payload:{ seguidores: []}});
    }catch(e){
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const getSeguidos = (dispatch) => async ({filtro,valor}) =>{
    try{
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        console.log(`/users/siguiendo?page=0&size=10&filtro=${filtro}&keywords=${valor}`);
        const response= await settings.get(`/users/siguiendo?page=0&size=10&filtro=${filtro}&keywords=${valor}`);
        dispatch({type:'getSeguidos', payload:{ seguidos: response.data}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }catch(e){
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const editarPerfil = (dispatch) => async (userId, newPerfil)=> {
    try{
        await settings.put(`users/${userId}`, newPerfil);
        
        dispatch({type:'onError', payload: {error: {titulo: 'Exito en editar perfil', cuerpo: 'Se ha actualizado su perfil', anterior: 'EditarPerfil', styleError: styles.success}}});
    }catch(e){
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo editar el perfil", activacion: null}}});
    }
}

const initialState = {
    currentUser: {},
    nombre: "",
    apellido: "",
    fechaNac: new Date(),
    biografia:"",
    seguidores:[],
    seguidos:[],
    filtro:filtroSeguidos._usuario,
    buscar:'',
    error: {},
    cargando: false
}

export const {Context, Provider} = crearContext(
    PerfilReducer,
    {getInfo, getSeguidores, getSeguidos, cambiarValor, cambiarFecha, editarPerfil },
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