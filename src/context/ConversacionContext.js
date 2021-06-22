import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestSizeListarCoversaciones, requestSizeListarUsuarios, requestSizeListarMensajes } from "../config/maximos";

const ConversacionReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'onError':
            return {...state,  error: action.payload.error};
        case 'editarConversacion':
            return {...state, to_usuario_id: "",  mensaje : "", tipoMensajeEnum: "TEXTO"};
        case 'listarConversacionesUsuario':
            return {...state, conversacionesUsuario: action.payload.conversacionesUsuario};
        case 'appendConversacionesUsuario':
            return {...state, conversacionesUsuario: [...state.conversacionesUsuario, ...action.payload.conversacionesUsuario]};
        case 'editarMensaje':
            var currentMensajes = {fecha_envio: "16/06/2021 20:41", from_usuario_nombre_apellido: null, from_usuario_id: action.payload.userId, mensaje: action.payload.mensaje.mensaje, tipo_mensaje: "TEXTO"}
            return {...state, mensaje : "", tipoMensajeEnum: "TEXTO", mensajesConversacion: [currentMensajes, ...state.mensajesConversacion]};
        case 'listarUsuariosParaConversar':
            return {...state, usuariosParaConversar: action.payload.usuariosParaConversar}
        case 'listarMensajesConversacion':
            return {...state, mensajesConversacion: action.payload.mensajesConversacion};
        case 'appendMensajesConversacion':
            return {...state, mensajesConversacion: [...state.mensajesConversacion, ...action.payload.mensajesConversacion]};
        default:
            return state;
    }
}

const cambiarValor = dispatch => ({variable,valor})=> {
    dispatch({type: 'cambiarValor', payload: {variable, valor}});
}

const crearConversacion = (dispatch) => async (conversacion)=> {
    try{
        const response = await settings.post(`chat/individual/crear`, JSON.stringify(conversacion), {headers: {"Content-Type":"application/json"}});      
        console.log(response)
    }catch(e){
        console.log(e)
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const listarConversacionesUsuario = dispatch => async ({page}) =>{
    const endpoint = `/chat/obtener-chats?page=${page}&size=${requestSizeListarCoversaciones}`;
    console.log(endpoint);
    try{
        var response = await settings.get(`/chat/obtener-chats?page=${page}&size=${requestSizeListarCoversaciones}`);
        if(page === 0){
            dispatch({type: 'listarConversacionesUsuario', payload: {conversacionesUsuario: response.data}});
        }else{
            dispatch({type: 'appendConversacionesUsuario', payload: {conversacionesUsuario: response.data}})
        }
    }catch(e){
        console.log(e);
    }
}

const crearMensaje = (dispatch) => async (mensaje, userId)=> {
    console.log('entró')
    try{
        const response = await settings.post(`/chat/individual/enviar-mensaje`, JSON.stringify(mensaje), {headers: {"Content-Type":"application/json"}});      
        dispatch({type:'editarMensaje', payload:{userId: userId, mensaje:mensaje}});
    }catch(e){
        console.log(e)
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const listarMensajesConversacion = dispatch => async (chat_id, {page}) =>{
    const endpoint = `/chat/obtener-mensajes?chatId=${chat_id}&page=${page}&size=${requestSizeListarMensajes}`;
    console.log(endpoint);
    try{
        var response = await settings.get(`/chat/obtener-mensajes?chatId=${chat_id}&page=${page}&size=${requestSizeListarMensajes}`);
        if(page === 0){
            dispatch({type: 'listarMensajesConversacion', payload: {mensajesConversacion: response.data}})
        }else{
            console.log('formato', response.data)
            dispatch({type: 'appendMensajesConversacion', payload: {mensajesConversacion: response.data}})
        }
    }catch(e){
        console.log(e);
    }
}

const listarUsuariosParaConversar = dispatch => async ({filtro,valor}) => {
    try{
        const endpoint = `/users?page=0&size=${requestSizeListarUsuarios}activo=true&bloqueado=false&${filtro}=${valor}`;
        const response = await settings.get(`/users?page=0&size=${requestSizeListarUsuarios}&activo=true&bloqueado=false&${filtro}=${valor}`);
        dispatch({type:'listarUsuariosParaConversar', payload: {usuariosParaConversar: response.data.content}});
    }catch(e){
        console.log(e);
    }
}

const initialState = {
    error: {},
    usuario: "",
    to_usuario_id: "",
    mensaje: "",
    tipoMensajeEnum: "TEXTO",
    cargando: false,
    conversacionesUsuario: [],
    usuariosParaConversar: [],
    mensajesConversacion: []
}

export const {Context, Provider} = crearContext(
    ConversacionReducer,
    {
        cambiarValor, 
        crearConversacion,
        listarConversacionesUsuario,
        crearMensaje,
        listarMensajesConversacion,
        listarUsuariosParaConversar
    },
    initialState,
);