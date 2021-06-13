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
        default:
            return state;
    }
}

const cambiarValor = dispatch => ({variable,valor})=> {
    dispatch({type: 'cambiarValor', payload: {variable, valor}});
}

const crearConversacion = (dispatch) => async (conversacion)=> {
    console.log('entró')
    try{
        const response = await settings.post(`chat/individual/crear`, JSON.stringify(conversacion), {headers: {"Content-Type":"application/json"}});      
        console.log(response)
        dispatch({type:'editarConversacion'});
    }catch(e){
        console.log(e)
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const listarConversacionesUsuario = dispatch => async ({page}) =>{
    console.log('llego')
    try{
        var response = await settings.get(`/chat/obtener-chats?page=0&size=5&orders=fechaCreado:desc`);
        console.log(response)
        dispatch({type: 'listarConversacionesUsuario', payload: {conversacionesUsuario: response.data.content}})
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
}

export const {Context, Provider} = crearContext(
    ConversacionReducer,
    {
        cambiarValor, 
        listarConversacionesUsuario,
        crearConversacion
    },
    initialState,
);