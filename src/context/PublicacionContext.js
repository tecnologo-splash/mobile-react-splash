import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestSizeListarPublicaciones } from "../config/maximos";
import { baseUriMultimedia, ordenPublicacion, tipoOrdenPublicacion } from "../config/configs";

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
            return {...state, currentPublicacion: {}, texto : null, duracion: 0, unidad: "HOURS", imagenes: [], videos: [], enlaces: [], opciones: []};
        case 'editarPublicacion':
            var imagenesCurrentPublicacion = []
            //Maldito git me cago esto
            if (action.payload.publicacionInfo.multimedia.length > 0)
            {
                action.payload.publicacionInfo.multimedia.filter(item => item.tipo === "FOTO").map((data)=>imagenesCurrentPublicacion.push({uri: baseUriMultimedia + data.url, type: data.tipo, width: 800, height: 600}))
            }           
            //Fin de maldito git
            var opcionesCurrentPublicacion = []
            if(action.payload.publicacionInfo.encuesta != null)
            {
                action.payload.publicacionInfo.encuesta.opciones.map((data)=>opcionesCurrentPublicacion.push({texto: data.texto}))
            }
            var enlacesCurrentPublicacion = []
            console.log(action.payload.publicacionInfo)
            if(action.payload.publicacionInfo.enlace_externo != null)
            {
                action.payload.publicacionInfo.enlace_externo.map((data)=>enlacesCurrentPublicacion.push({url: data.url}))
            }
            return {...state, currentPublicacion: action.payload.publicacionInfo, texto : action.payload.publicacionInfo.texto, duracion: 0, unidad: "HOURS", imagenes: imagenesCurrentPublicacion, videos: [], enlaces: enlacesCurrentPublicacion, opciones: opcionesCurrentPublicacion};
        case 'listarPublicacionesUsuario':
            return {...state, publicacionesUsuario: action.payload.publicacionesUsuario};
        case 'listarPublicacionesMuro':
            return {...state, publicaciones: action.payload.publicaciones};
        case 'appendPublicacionesMuro':
            return {...state, publicaciones: [...state.publicaciones, ...action.payload.publicaciones]};
        case 'reaccionar':
            var [publicacionReaccionada] = state.publicaciones.filter(item=>item.id===action.payload.publicacionId);
            for ( var i = 0; i < state.publicaciones.length; i++){
                if(publicacionReaccionada.id === state.publicaciones[i].id){
                    state.publicaciones[i] = {...state.publicaciones[i], resumen_reaccion:{...state.publicaciones[i].resumen_reaccion, mi_reaccion: action.payload.tipoReaccion}};
                }  
            }
            //var publicacionesMenosReaccionada = state.publicaciones.filter(item=>item.id!=action.payload.publicacionId);
            /*var kk = {...state, publicaciones: [...publicacionesMenosReaccionada, 
                {...publicacionReaccionada, 
                resumen_reaccion:{...publicacionReaccionada.resumen_reaccion, mi_reaccion: action.payload.tipoReaccion}}]};*/

            return state;
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

const borrarImagen = dispatch => (uri) =>{
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
        console.log(response.data);
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

const listarPublicacionesMuro = dispatch => async ({page, orden, tipoOrden}) =>{
    try{
        console.log(`/posts?page=${page}&size=${requestSizeListarPublicaciones}&orders=${tipoOrden.url}:${orden}`);
        var response = await settings.get(`/posts?page=${page}&size=${requestSizeListarPublicaciones}&orders=${tipoOrden.url}:${orden}`);
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

const votar = dispatch => async ({opcionId, publicacionId})=>{
    try{
        console.log(`/posts/${publicacionId}/opciones/${opcionId}`);
        await settings.post(`/posts/${publicacionId}/opciones/${opcionId}`);
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
    duracion: 0,
    unidad: "HOURS",
    error: {},
    cargando: false,
    publicaciones: [],
    publicacionesUsuario: [],
    tipoOrden: tipoOrdenPublicacion[0],
    orden: ordenPublicacion._desc
}

export const {Context, Provider} = crearContext(
    PublicacionReducer,
    {cambiarValor, 
     crearPublicacion, 
     editarPublicacion , 
     eliminarPublicacion, 
     agregarImagen, 
     cancelarImagen,
     borrarImagen,
     agregarVideo, 
     cancelarVideo, 
     agregarOpcion, 
     cancelarOpcion,
     agregarEnlace, 
     cancelarEnlace,
     listarPublicacionesMuro,
     reaccionarPublicacion,
     eliminarReaccion,
     listarPublicacionesUsuario,
     votar
    },
    initialState,
);