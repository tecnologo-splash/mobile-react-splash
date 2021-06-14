import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        case 'editarMensaje':
            return {...state, mensaje : "", tipoMensajeEnum: "TEXTO"};
        case 'listarMensajesConversacion':
            return {...state, mensajesConversacion: action.payload.mensajesConversacion};
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

const listarConversacionesUsuario = dispatch => async () =>{
    try{
        var response = await settings.get(`/chat/obtener-chats?page=0&size=5`);
        dispatch({type: 'listarConversacionesUsuario', payload: {conversacionesUsuario: response.data}})
    }catch(e){
        console.log(e);
    }
}

const crearMensaje = (dispatch) => async (mensaje)=> {
    console.log('entró')
    try{
        const response = await settings.post(`/chat/individual/enviar-mensaje`, JSON.stringify(mensaje), {headers: {"Content-Type":"application/json"}});      
        console.log(response)
        dispatch({type:'editarMensaje'});
    }catch(e){
        console.log(e)
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const listarMensajesConversacion = dispatch => async (chat_id) =>{
    try{
        var response = await settings.get(`/chat/obtener-mensajes?chatId=${chat_id}&page=0&size=5`);
        dispatch({type: 'listarMensajesConversacion', payload: {mensajesConversacion: response.data}})
    }catch(e){
        console.log(e);
    }
}

const initialState = {
    error: {},
    to_usuario_id: "",
    mensaje: "",
    tipoMensajeEnum: "TEXTO",
    cargando: false,
    conversacionesUsuario: [],
    mensajesConversacion: []
}

export const {Context, Provider} = crearContext(
    ConversacionReducer,
    {
        cambiarValor, 
        crearConversacion,
        listarConversacionesUsuario,
        crearMensaje,
        listarMensajesConversacion
    },
    initialState,
);