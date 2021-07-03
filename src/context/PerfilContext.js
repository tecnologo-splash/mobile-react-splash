import crearContext from "./crearContext";
import settings from '../config/settings';
import { filtroSeguidos } from "../config/filtros";
import { StyleSheet } from 'react-native';
import { requestSizeListarSeguidores, requestSizeListarSeguidos } from "../config/maximos";

const PerfilReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'getSeguidores':
            return {...state, seguidores: action.payload.seguidores, cargando: false};
        case 'getSeguidos':
            return {...state, seguidos: action.payload.seguidos, cargando: false};
        case 'appendSeguidos':
            return {...state, seguidos: [...state.seguidos, ...action.payload.seguidos], cargando: false};
        case 'getInfo':
            return {...state, currentUser: action.payload.userInfo, biografia: action.payload.userInfo ? action.payload.userInfo.biografia : ""};
        case 'getInfoExterno':
            return {...state, user: action.payload.userInfo, biografia: action.payload.userInfo ? action.payload.userInfo.biografia : ""};
        case 'cambiarFecha':
            return {...state, fechaNac: action.payload.date};
        case 'onError':
            return {...state,  error: action.payload.error};
        case 'editarPerfil':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, styleError:null}};
        case 'getConfigNotif':
            return {...state, configNotif: action.payload.configNotif};
        case 'cambiar_lo_sigo':
            return {...state, user:{...state.user, lo_sigo: action.payload.lo_sigo}};
        default:
            return state;
    }
}
const cambiarValor = dispatch => ({variable,valor})=> {
    dispatch({type: 'cambiarValor', payload: {variable, valor}});
}

const getInfo = (dispatch) => async () =>{
    
    try {
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        console.log('/users/info');
        const response = await settings.get('/users/info' );
        console.log(response.data.id)
        dispatch({type: 'getInfo', payload: {userInfo:response.data}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});

    } catch (e) {
        console.log("error en getInfo",e);
        dispatch({type: 'onError', payload: {error: e}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const getInfoExterno = (dispatch) => async ({userId}) =>{
    
    try {
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        console.log(`/users/info/${userId}`);
        const response = await settings.get(`/users/info/${userId}`);
        dispatch({type: 'getInfoExterno', payload: {userInfo:response.data}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});

    } catch (e) {
        console.log("error en getInfo",e);
        dispatch({type: 'onError', payload: {error: e}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const cambiarFecha = (dispatch) => (date) =>{
    dispatch({type: "cambiarFecha",payload:{date}});
}

const getSeguidores = (dispatch) => async ({filtro,valor, page}) =>{
    try{
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        console.log(`/users/me-siguen?page=${page}&size=${requestSizeListarSeguidores}&filtro=${filtro}&keywords=${valor}`);
        const response= await settings.get(`/users/me-siguen?page=${page}&size=${requestSizeListarSeguidores}&filtro=${filtro}&keywords=${valor}`);
        if(page == 0){
            dispatch({type:'getSeguidores', payload:{ seguidores: response.data}});
        }else{
            dispatch({type:'appendSeguidores', payload:{ seguidores: response.data}});
        }        
        console.log("seguidores:", response.data);
    }catch(e){
        console.log("error en getSeguidores",e);
        dispatch({type: 'onError', payload: {error: e}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const getSeguidos = (dispatch) => async ({filtro,valor, page}) =>{
    try{
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        console.log(`/users/yo-sigo?page=${page}&size=${requestSizeListarSeguidos}&filtro=${filtro}&keywords=${valor}`);
        const response= await settings.get(`/users/yo-sigo?page=${page}&size=${requestSizeListarSeguidos}&filtro=${filtro}&keywords=${valor}`);
        if(page == 0){
            dispatch({type:'getSeguidos', payload:{ seguidos: response.data}});
        }else{
            dispatch({type:'appendSeguidos', payload:{ seguidos: response.data}});
        }        
    }catch(e){
        console.log("error en seguidos",e);
        dispatch({type: 'onError', payload: {error: e}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const editarPerfil = (dispatch) => async (userId, newPerfil)=> {
    try{
        await settings.put(`users/${userId}`, newPerfil);
        console.log("foto de perfil",newPerfil);
        console.log(`users/${userId}`);
        dispatch({type:'onError', payload: {error: {titulo: 'Exito en editar perfil', cuerpo: 'Se ha actualizado su perfil', anterior: 'EditarPerfil', styleError: styles.success}}});
    }catch(e){
        console.log(e);
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo editar el perfil", activacion: null}}});
    }
}

const getConfigNotif = (dispatch) => async () =>{
    
    try {
        const response = await settings.get('/configuracion-notificaciones', {headers: {'Content-Type': "application/json"}} );

        dispatch({type: 'getConfigNotif', payload: {configNotif:response.data}});
        console.log(response.data);

    } catch (e) {
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const denunciarPerfil = dispatch => async ({usuario_denunciado_id, tipo}) => {
    try{
        const obj = JSON.stringify({usuario_denunciado_id, tipo});
        const response = await settings.post('/denuncias', obj, {headers: {'Content-Type': "application/json"}});
        return response.data;
    }catch (e){
        console.log(e);
    }
}

const cambiar_lo_sigo = dispatch => ({lo_sigo}) => {
    dispatch({type: 'cambiar_lo_sigo', payload: {lo_sigo}});
}
const initialState = {
    currentUser: {},
    user:{},
    nombre: "",
    apellido: "",
    fechaNac: new Date(),
    biografia:"",
    seguidores:[],
    seguidos:[],
    filtro:filtroSeguidos._usuario,
    buscar:'',
    error: {},
    configNotif: {},
    cargando: false,
}

export const {Context, Provider} = crearContext(
    PerfilReducer,
    {getInfo, getInfoExterno, getSeguidores, getSeguidos, cambiarValor, cambiarFecha, editarPerfil, getConfigNotif , cambiar_lo_sigo, denunciarPerfil},
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