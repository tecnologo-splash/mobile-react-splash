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
        case 'agregarOpcion':
            return {...state, opciones: [...state.opciones, action.payload.opcion], opcion: null};
        case 'cancelarOpcion':
            var todasOpcionesMenosCancelada = state.opciones.filter(item => item.texto != action.payload.uri);
            return {...state, opciones: todasOpcionesMenosCancelada };
        case 'agregarEnlace':
            return {...state, enlaces: [...state.enlaces, action.payload.enlace], enlace: null};
        case 'cancelarEnlace':
            var todosEnlacesMenosCancelado = state.enlaces.filter(item => item.uri != action.payload.uri);
            return {...state, enlaces: todosEnlacesMenosCancelado };
        case 'onError':
            return {...state,  error: action.payload.error};
        case 'crearPublicacion':
            return {...state, imagenes: [], videos: [], opciones: [], texto : null, currentPublicacion: {}};
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
const agregarOpcion = dispatch => (opcion) => {
    dispatch({type: 'agregarOpcion', payload: {opcion}});
}

const cancelarOpcion = dispatch => (uri) =>{
    console.log('cancelarOpcion')
    console.log(uri)
    console.log(enlaces)
    dispatch({type: 'cancelarOpcion', payload: {uri}});
}

const agregarEnlace = dispatch => (enlace) => {
    dispatch({type: 'agregarEnlace', payload: {enlace}});
}

const cancelarEnlace = dispatch => (uri) =>{
    dispatch({type: 'cancelarEnlace', payload: {uri}});
}

const crearPublicacion = (dispatch) => async (publicacion, multimedias)=> {
    try{
        const response = await settings.post(`posts`, JSON.stringify(publicacion), {headers: {"Content-Type":"application/json"}});
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
                await settings.post(`/posts/${response.data.id}/multimedia`, formData);
            }catch(e){
                dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo subir el multimedia", activacion: null}}});
            }
        }
        dispatch({type:'editarPublicacion', payload: {publicacionInfo:response.data}});
    }catch(e){
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const editarPublicacion = (dispatch) => async (pubId, publicacion)=> {
    try{
        const response = await settings.patch(`posts/${pubId}`, publicacion);
        dispatch({type:'editarPublicacion', payload: {publicacionInfo:response.data}});
    }catch(e){
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const eliminarPublicacion = (dispatch) => async (pubId)=> {
    try{
        await settings.delete(`posts/${pubId}`);
        dispatch({type:'crearPublicacion'});
    }catch(e){
        dispatch({type: 'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
    
}

const listarPublicacionesMuro = dispatch => async ({page, orden, asc}) =>{
    try{
        console.log(`/posts?page=${page}&size=${requestSizeListarPublicaciones}&orders=${orden}:${asc}`);
        var response = await settings.get(`/posts?page=${page}&size=${requestSizeListarPublicaciones}&orders=${orden}:${asc}`);
        console.log("response",response.data.content.length);
        if(page === 0){
            dispatch({type: 'listarPublicacionesMuro', payload: {publicaciones: response.data.content}})
        }else{
            dispatch({type: 'appendPublicacionesMuro', payload: {publicaciones: response.data.content}})
        }
    }catch(e){
    }
}

const listarPublicacionesUsuario = dispatch => async ({userId}) =>{
    try{
        var response = await settings.get(`/posts/users/${userId}?page=0&size=5&orders=fechaCreado:desc`);
        dispatch({type: 'listarPublicacionesUsuario', payload: {publicacionesUsuario: response.data.content}})
    }catch(e){
        console.log(e);
    }
}
const reaccionarPublicacion = dispatch => async ({publicacionId, tipoReaccion}) => {
    try{
        const response = await settings.post(`/posts/${publicacionId}/reacciones`,JSON.stringify({emoji: tipoReaccion}),
        {headers: {'Content-Type': "application/json"}});
        dispatch({type: "reaccionar", payload:{publicacionId, tipoReaccion}});
    }catch(e){
        console.log(e);
    }
}

const eliminarReaccion = dispatch => async ({publicacionId}) => {
    try{
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
    opciones: [],
    enlaces: [],
    texto: "",
    error: {},
    cargando: false,
    publicaciones: [],
    publicacionesUsuario: [],
    tipoOrden: tipoOrdenPublicacion[0]
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
     agregarOpcion, 
     cancelarOpcion,
     agregarEnlace, 
     cancelarEnlace,
     listarPublicacionesMuro,
     reaccionarPublicacion,
     eliminarReaccion,
     listarPublicacionesUsuario
    },
    initialState,
);