import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filtroSeguidos } from "../componentes/filtros";

const PerfilReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'getSeguidores':
            return {...state, seguidores: action.payload.seguidores};
        case 'getSeguidos':
            return {...state, seguidos: action.payload.seguidos};
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

const cambiarValor = dispatch => ({variable,valor})=> {
    dispatch({type: 'cambiarValor', payload: {variable, valor}});
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
const getSeguidores = (dispatch) => async () =>{
    try{
        
        dispatch({type:'getSeguidores', payload:{ seguidores: []}});
    }catch(e){
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const getSeguidos = (dispatch) => async ({filtro,valor}) =>{
    try{
        console.log("filtro en getSeguidos", filtro);
        console.log(`/users/siguiendo?page=0&size=10&filtro=${filtro}&keywords=${valor}`);
        const response= await settings.get(`/users/siguiendo?page=0&size=10&filtro=${filtro}&keywords=${valor}`);
        console.log(response.data.length);
        dispatch({type:'getSeguidos', payload:{ seguidos: response.data}});
    }catch(e){
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
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
    buscar:''
}

export const {Context, Provider} = crearContext(
    PerfilReducer,
    {getInfo, getSeguidores, getSeguidos, cambiarValor, cambiarFecha },
    initialState
);