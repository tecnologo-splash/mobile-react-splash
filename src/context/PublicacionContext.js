import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestSizeListarPublicaciones } from "../config/maximos";

const PublicacionReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'agregarImagen':
            return {...state, imagenes: [...state.imagenes, action.payload.imagen]};
        case 'cancelarImagen':
            var todasImagenesMenosCancelada = state.imagenes.filter(item => item.uri != action.payload.uri);
            return {...state, imagenes: todasImagenesMenosCancelada};
        case 'agregarVideo':
            return {...state, videos: [...state.videos, action.payload.video]};
        case 'cancelarVideo':
            var todosVideosMenosCancelado = state.videos.filter(item => item.uri != action.payload.uri);
            return {...state, videos: todosVideosMenosCancelado};
        case 'onError':
            return {...state,  error: action.payload.error};
        case 'crearPublicacion':
            return {...state, imageU:null, imageW:null, imageH:null, videoU:null, videoW:null, videoH:null, texto : null, currentPublicacion: {}};
        case 'editarPublicacion':
            return {...state, currentPublicacion: action.payload.publicacionInfo};
            case 'listarPublicacionesUsuario':
            return {...state, publicacionesUsuario: action.payload.publicacionesUsuario};
        case 'listarPublicacionesMuro':
            return {...state, publicaciones: action.payload.publicaciones};
        case 'appendPublicacionesMuro':
            return {...state, publicaciones: [...state.publicaciones, ...action.payload.publicaciones]};
        case 'reaccionar':
            var publicacionesMenosReaccionada = state.publicaciones.filter(item=>item.id!=action.payload.publicacionId);
            var [publicacionReaccionada] = state.publicaciones.filter(item=>item.id===action.payload.publicacionId);

            var kk = {...state, publicaciones: [...publicacionesMenosReaccionada, 
                {...publicacionReaccionada, 
                resumen_reaccion:{...publicacionReaccionada.resumen_reaccion, mi_reaccion: action.payload.tipoReaccion}}]};

            return kk;
        case 'eliminarReaccion':
            var publicacionesMenosReaccionada = state.publicaciones.filter(item=>item.id!=action.payload.publicacionId);
            var [publicacionReaccionada] = state.publicaciones.filter(item=>item.id===action.payload.publicacionId);

            var retorno = {...state, publicaciones: [...publicacionesMenosReaccionada, 
                {...publicacionReaccionada, 
                resumen_reaccion:{...publicacionReaccionada.resumen_reaccion, mi_reaccion: null}}]};

            return retorno;
        default:
            return state;
    }
}

const cambiarValor = dispatch => ({variable,valor})=> {
    dispatch({type: 'cambiarValor', payload: {variable, valor}});
}

const agregarImagen = dispatch => (imagen) => {
    dispatch({type: 'agregarImagen', payload: {imagen}});
}

const cancelarImagen = dispatch => (uri) =>{
    dispatch({type: 'cancelarImagen', payload: {uri}});
}

const agregarVideo = dispatch => (video) => {
    dispatch({type: 'agregarVideo', payload: {video}});
}

const cancelarVideo = dispatch => (uri) =>{
    dispatch({type: 'cancelarVideo', payload: {uri}});
}

const crearPublicacion = (dispatch) => async (publicacion, multimedias)=> {
    try{
        console.log('crearPublicacion');
        const response = await settings.post(`posts`, publicacion);
        for(var i = 0; i < multimedias.length; i++){
            var multimedia = multimedias[i];
            var file = {
                uri: multimedia.uri,
                type: multimedia.type + '/' + multimedia.uri.split('.').pop(),
                name: 'multimedia_'+ response.data.id + '_' + i + '.' + multimedia.uri.split('.').pop()
            }
            var formData = new FormData();
            formData.append("file", file);
            try{
                console.log('subirMultimedia');
                await settings.post(`/posts/${response.data.id}/multimedia`, formData);
            }catch(e){
                console.log(e);
                dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo subir el multimedia", activacion: null}}});
            }
        }
        dispatch({type:'editarPublicacion', payload: {publicacionInfo:response.data}});
    }catch(e){
        console.log(e);
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const editarPublicacion = (dispatch) => async (pubId, publicacion)=> {
    try{
        console.log('editarPublicacion');
        const response = await settings.patch(`posts/${pubId}`, publicacion);
        console.log(response);
        dispatch({type:'editarPublicacion', payload: {publicacionInfo:response.data}});
    }catch(e){
        console.log(e);
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const eliminarPublicacion = (dispatch) => async (pubId)=> {
    try{
        console.log('eliminarPublicacion');
        await settings.delete(`posts/${pubId}`);
        dispatch({type:'crearPublicacion'});
    }catch(e){
        console.log(e);
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const listarPublicacionesMuro = dispatch => async ({page}) =>{
    try{
        console.log(`/posts?page=${page}&size=${requestSizeListarPublicaciones}&orders=fechaCreado:desc`);
        var response = await settings.get(`/posts?page=${page}&size=${requestSizeListarPublicaciones}&orders=fechaCreado:desc`);
        console.log("response",response.data.content.length);
        if(page === 0){
            dispatch({type: 'listarPublicacionesMuro', payload: {publicaciones: response.data.content}})
        }else{
            dispatch({type: 'appendPublicacionesMuro', payload: {publicaciones: response.data.content}})
        }
    }catch(e){
        console.log(e);
    }
}

const listarPublicacionesUsuario = dispatch => async ({userId}) =>{
    try{
        console.log(`/posts/users/${userId}?page=0&size=5&orders=fechaCreado:desc`);
        var response = await settings.get(`/posts/users/${userId}?page=0&size=5&orders=fechaCreado:desc`);
        console.log("response listarPublicacionesUsuario",response.data.content);
        dispatch({type: 'listarPublicacionesUsuario', payload: {publicacionesUsuario: response.data.content}})
    }catch(e){
        console.log(e);
    }
}
const reaccionarPublicacion = dispatch => async ({publicacionId, tipoReaccion}) => {
    try{
        console.log(`/posts/${publicacionId}/reacciones`);
        const response = await settings.post(`/posts/${publicacionId}/reacciones`,JSON.stringify({emoji: tipoReaccion}),
        {headers: {'Content-Type': "application/json"}});
        dispatch({type: "reaccionar", payload:{publicacionId, tipoReaccion}});
    }catch(e){
        console.log(e);
    }
}

const eliminarReaccion = dispatch => async ({publicacionId}) => {
    try{
        console.log(`/posts/${publicacionId}/reacciones`);
        await settings.delete(`/posts/${publicacionId}/reacciones`);
        dispatch({type: "eliminarReaccion", payload:{publicacionId}});
    }catch(e){
        console.log(e);
    }
}

const initialState = {
    currentPublicacion: {},
    imagenes: [],
    videos: [],
    texto: "",
    error: {},
    cargando: false,
    publicaciones: [],
    publicacionesUsuario: []
}

export const {Context, Provider} = crearContext(
    PublicacionReducer,
    {cambiarValor, 
     crearPublicacion, 
     editarPublicacion , 
     eliminarPublicacion, 
     agregarImagen, 
     cancelarImagen, 
     agregarVideo, 
     cancelarVideo, 
     listarPublicacionesMuro,
     reaccionarPublicacion,
     eliminarReaccion,
     listarPublicacionesUsuario
    },
    initialState,
);