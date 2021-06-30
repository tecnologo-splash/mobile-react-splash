import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestSizeListarPublicaciones } from "../config/maximos";
import { baseUriMultimedia, ordenPublicacion, tipoOrdenPublicacion } from "../config/configs";

const PublicacionReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'agregarMultimedia':
            return {...state, multimedias: [...state.multimedias, action.payload.multimedia]};
        case 'cancelarMultimedia':
            var todosMultimediasMenosCancelado = state.multimedias.filter(item => item.uri != action.payload.uri);
            return {...state, multimedias: todosMultimediasMenosCancelado};
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
            var todosEnlacesMenosCancelado = state.enlaces.filter(item => item.url != action.payload.uri);
            return {...state, enlaces: todosEnlacesMenosCancelado };
        case 'onError':
            return {...state,  error: action.payload.error};
        case 'crearPublicacion':
            return {...state, currentPublicacion: {}, texto : null, tipoPub: 0, duracion: 0, unidad: "HOURS", imagenes: [], videos: [], enlaces: [], opciones: []};
        case 'editarPublicacion':
            return {...state, currentPublicacion: {}, texto : null, tipoPub: 0, duracion: 0, unidad: "HOURS", imagenes: [], videos: [], enlaces: [], opciones: []};
        case 'borrarMultimediaPublicacion':
            var multimediasCurrentPublicacion = []
            if (action.payload.publicacionInfo.multimedia.length > 0)
            {
                action.payload.publicacionInfo.multimedia.map((data)=>multimediasCurrentPublicacion.push({id: data.id, tipo: data.tipo==="FOTO"?"Images":"Videos" , uri: baseUriMultimedia + data.url, type: data.tipo, width: 800, height: 600}))
            }
            var enlacesCurrentPublicacion = []
            console.log(action.payload.publicacionInfo)
            if(action.payload.publicacionInfo.enlace_externo.length > 0)
            {
                action.payload.publicacionInfo.enlace_externo.map((data)=>enlacesCurrentPublicacion.push({url: data.url}))
            }
            var opcionesCurrentPublicacion = []
            if(action.payload.publicacionInfo.encuesta != null)
            {
                action.payload.publicacionInfo.encuesta.opciones.map((data)=>opcionesCurrentPublicacion.push({texto: data.texto}))
            }
            return {...state, currentPublicacion:action.payload.publicacionInfo, texto : action.payload.publicacionInfo.texto, duracion: 0, unidad: "HOURS", multimedias: multimediasCurrentPublicacion, enlaces: enlacesCurrentPublicacion, opciones: opcionesCurrentPublicacion};
        case 'listarPublicacionesUsuario':
            return {...state, publicacionesUsuario: action.payload.publicacionesUsuario, redireccionar: false};
        case 'appendPublicacionesUsuario':
            return {...state, publicacionesUsuario: [...state.publicacionesUsuario, ...action.payload.publicacionesUsuario], redireccionar: false}
        case 'listarPublicacionesMuro':
            return {...state, publicaciones: action.payload.publicaciones, redireccionar: false};
        case 'appendPublicacionesMuro':
            return {...state, publicaciones: [...state.publicaciones, ...action.payload.publicaciones], redireccionar: false};
        case 'reaccionar':
            if(state.publicaciones.filter(item=>item.id===action.payload.publicacionId).length == 0){
                var [publicacionReaccionada] = state.publicacionesUsuario.filter(item=>item.id===action.payload.publicacionId);
                for ( var i = 0; i < state.publicacionesUsuario.length; i++){
                    if(publicacionReaccionada.id === state.publicacionesUsuario[i].id){
                        state.publicacionesUsuario[i] = {...state.publicacionesUsuario[i], resumen_reaccion:{...state.publicacionesUsuario[i].resumen_reaccion, mi_reaccion: action.payload.tipoReaccion}};
                    }  
                }
            } else {
                var [publicacionReaccionada] = state.publicaciones.filter(item=>item.id===action.payload.publicacionId);
                for ( var i = 0; i < state.publicaciones.length; i++){
                    if(publicacionReaccionada.id === state.publicaciones[i].id){
                        state.publicaciones[i] = {...state.publicaciones[i], resumen_reaccion:{...state.publicaciones[i].resumen_reaccion, mi_reaccion: action.payload.tipoReaccion}};
                    }  
                }
            }
            return state;
        case 'eliminarReaccion':
            if(state.publicaciones.filter(item=>item.id===action.payload.publicacionId).length == 0){
                var [publicacionReaccionada] = state.publicacionesUsuario.filter(item=>item.id===action.payload.publicacionId);
                for ( var i = 0; i < state.publicacionesUsuario.length; i++){
                    if(publicacionReaccionada.id === state.publicacionesUsuario[i].id){
                        state.publicacionesUsuario[i] = {...state.publicacionesUsuario[i], resumen_reaccion:{...state.publicacionesUsuario[i].resumen_reaccion, mi_reaccion: null}};
                    }  
                }
            } else {
                var [publicacionReaccionada] = state.publicaciones.filter(item=>item.id===action.payload.publicacionId);
                for ( var i = 0; i < state.publicaciones.length; i++){
                    if(publicacionReaccionada.id === state.publicaciones[i].id){
                        state.publicaciones[i] = {...state.publicaciones[i], resumen_reaccion:{...state.publicaciones[i].resumen_reaccion, mi_reaccion: null}};
                    }  
                }
            }
            return state;
        case 'actualizarComentarios':
            for(i=0 ; i<state.publicaciones.length ; i++) {
                if(action.payload.publicacionId === state.publicaciones[i].id) {
                    console.log("actualizo el comentario en ", action.payload.publicacionId);
                    console.log("cant Comentarios en actualizar", action.payload.comentarios.length);
                    state.publicaciones[i] = {...state.publicaciones[i], comentarios: action.payload.comentarios};
                }
            }
            return state;
        case 'currentPublicacion':
            var currentTipoPub = 0
            var multimediasCurrentPublicacion = []
            if (action.payload.currentPublicacion.multimedia.length > 0)
            {
                action.payload.currentPublicacion.multimedia.map((data)=>multimediasCurrentPublicacion.push({id: data.id, tipo: data.tipo==="FOTO"?"Images":"Videos" , uri: baseUriMultimedia + data.url, type: data.tipo, width: 800, height: 600}))
                currentTipoPub = 1
            }
            var enlacesCurrentPublicacion = []
            console.log(action.payload.currentPublicacion)
            if(action.payload.currentPublicacion.enlace_externo.length > 0)
            {
                action.payload.currentPublicacion.enlace_externo.map((data)=>enlacesCurrentPublicacion.push({url: data.url}))
                currentTipoPub = 3
            }
            var opcionesCurrentPublicacion = []
            if(action.payload.currentPublicacion.encuesta != null)
            {
                action.payload.currentPublicacion.encuesta.opciones.map((data)=>opcionesCurrentPublicacion.push({texto: data.texto}))
                currentTipoPub = 4
            }
            return {...state, currentPublicacion:action.payload.currentPublicacion, tipoPub: currentTipoPub, texto : action.payload.currentPublicacion.texto, duracion: 0, unidad: "HOURS", multimedias: multimediasCurrentPublicacion, enlaces: enlacesCurrentPublicacion, opciones: opcionesCurrentPublicacion};
        case 'setRedireccionar':
            return {...state, redireccionar: false};
        default:
            return state;
    }
}

const cambiarValor = dispatch => ({variable,valor})=> {
    dispatch({type: 'cambiarValor', payload: {variable, valor}});
}

const agregarMultimedia = dispatch => (multimedia) => {
    dispatch({type: 'agregarMultimedia', payload: {multimedia}});
}

const cancelarMultimedia = dispatch => (uri) =>{
    dispatch({type: 'cancelarMultimedia', payload: {uri}});
}

const borrarMultimedia = dispatch => async (pubId, multId) =>{
    console.log('Mensaje', pubId, multId)
    try{
        const response = await settings.delete(`posts/${pubId}/multimedia/${multId}`);
        dispatch({type:'borrarMultimediaPublicacion', payload: {publicacionInfo:response.data}});
    }catch(e){
        dispatch({type:'onError', payload: {error: {tipo:"ERROR", mensaje: "No se pudo crear la publicación", activacion: null}}});
    }
}

const agregarOpcion = dispatch => (opcion) => {
    dispatch({type: 'agregarOpcion', payload: {opcion}});
}

const cancelarOpcion = dispatch => (uri) =>{
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

const editarPublicacion = (dispatch) => async (pubId, publicacion, multimedias)=> {
    try{
        const response = await settings.patch(`posts/${pubId}`, publicacion);
        for(var i = 0; i < multimedias.length; i++){
            var multimedia = multimedias[i];
            if(!multimedia.uri.startsWith(baseUriMultimedia)){
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
        }
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
        if(response.status === 403){
            dispatch({type: 'cambiarValor', payload:{variable:'redireccionar', valor:true}})
        }
        if(page === 0){
            dispatch({type: 'listarPublicacionesMuro', payload: {publicaciones: response.data.content}})
        }else{
            dispatch({type: 'appendPublicacionesMuro', payload: {publicaciones: response.data.content}})
        }
    }catch(e){
        dispatch({type: 'cambiarValor', payload:{variable:'redireccionar', valor:true}})
    }
}

const listarPublicacionesUsuario = dispatch => async ({userId, page, tipoOrden,orden}) =>{
    try{
        console.log(`/posts/users/${userId}?page=${page}&size=${requestSizeListarPublicaciones}&orders=${tipoOrden.url}:${orden}`);
        var response = await settings.get(`/posts/users/${userId}?page=${page}&size=${requestSizeListarPublicaciones}&orders=${tipoOrden.url}:${orden}`);
        if(response.status === 403){
            dispatch({type: 'cambiarValor', payload:{variable:'redireccionar', valor:true}})
        }
        if(page == 0){
            dispatch({type: 'listarPublicacionesUsuario', payload: {publicacionesUsuario: response.data.content}})
        }else{
            dispatch({type: 'appendPublicacionesUsuario', payload: {publicacionesUsuario: response.data.content}})
        }
    }catch(e){
        console.log(e);
        dispatch({type: 'cambiarValor', payload:{variable:'redireccionar', valor:true}})
    }
}
const reaccionarPublicacion = dispatch => async ({publicacionId, tipoReaccion}) => {
    try{
        dispatch({type: "reaccionar", payload:{publicacionId, tipoReaccion}});
        const response = await settings.post(`/posts/${publicacionId}/reacciones`,JSON.stringify({emoji: tipoReaccion}),
        {headers: {'Content-Type': "application/json"}});
        
    }catch(e){
        console.log(e);
    }
}

const eliminarReaccion = dispatch => async ({publicacionId}) => {
    try{
        dispatch({type: "eliminarReaccion", payload:{publicacionId}});
        console.log(`/posts/${publicacionId}/reacciones`);
        await settings.delete(`/posts/${publicacionId}/reacciones`);
        
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

const actualizarComentariosPublicacion = dispatch => ({publicacionId, comentarios}) => {
    dispatch({type:"actualizarComentarios", payload:{publicacionId, comentarios}})
}

const setCurrentPublicacion = dispatch => ({currentPublicacion}) => {
    dispatch({type:"currentPublicacion", payload:{currentPublicacion}});
}

const setRedireccionar = (dispatch) => () =>{
    dispatch({type:"setRedireccionar"});
}
const initialState = {
    currentPublicacion: {},
    tipoPub : 0,
    multimedias: [],
    opciones: [],
    enlaces: [],
    texto: "",
    duracion: 0,
    unidad: "HOURS",
    error: {},
    redireccionar: false,
    cargando: false,
    publicaciones: [],
    publicacionesUsuario: [],
    tipoOrden: tipoOrdenPublicacion[0],
    orden: ordenPublicacion._desc,
}

export const {Context, Provider} = crearContext(
    PublicacionReducer,
    {cambiarValor, 
     crearPublicacion, 
     editarPublicacion , 
     eliminarPublicacion, 
     agregarMultimedia,
     cancelarMultimedia,
     borrarMultimedia,
     agregarOpcion, 
     cancelarOpcion,
     agregarEnlace, 
     cancelarEnlace,
     listarPublicacionesMuro,
     reaccionarPublicacion,
     eliminarReaccion,
     listarPublicacionesUsuario,
     votar,
     actualizarComentariosPublicacion,
     setCurrentPublicacion,
     setRedireccionar
    },
    initialState,
);