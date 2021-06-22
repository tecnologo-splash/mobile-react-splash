import crearContext from "./crearContext";
import settings from '../config/settings';

const ComentariosReducer = (state,action) => {
    switch(action.type){
        case 'comentarios':
            return {...state, comentarios: action.payload.comentarios};
        case 'deleteComment':
            return {...state, comentarios: state.comentarios.filter(coment=>coment.id !=action.payload.comentarioId)};
        case 'comentario_a_responder':
            return {...state, comentario_a_responder: action.payload.comentarioId};
        case 'deleteResponse':
            for (var i = 0; i <state.comentarios.length ; i++) {
                if(state.comentarios[i].id === action.payload.comentarioId){
                    state.comentarios[i].respuestas = state.comentarios[i].respuestas.filter(respuesta=>respuesta.id != action.payload.respuestaId);
                    console.log(state.comentarios[i].respuestas);
                }
            }
            return state;
        default:
            return state;
    }
}

const crearComentario = dispatch => async ({text,publicacionId})=> {
    try{
        console.log("Texto de comentrio", text);
        console.log(`/posts/${publicacionId}/comentarios`);
        const response = await settings.post(`/posts/${publicacionId}/comentarios`, JSON.stringify({texto: text}), {headers: {'Content-Type':'application/json'}});
        
        dispatch({type:"comentarios", payload:{comentarios: response.data.comentarios}});
        console.log("comentarios en CrearComentario", response.data.comentarios.length);
        return response.data.comentarios;
    }catch(e){
        console.log(e);
    }

}

const eliminarComentario = dispatch => async ({comentarioId, publicacionId}) => {
    try{
        console.log(`/posts/${publicacionId}/comentarios/${comentarioId}`);
        settings.delete(`/posts/${publicacionId}/comentarios/${comentarioId}`);
        dispatch({type: 'deleteComment', payload:{comentarioId}});
    }catch (e){
        console.log(e);
    }
}

const setComentarios = dispatch => (comentarios)=> {
    dispatch({type:"comentarios", payload:{comentarios}});

}

const setComentarioAResponder = dispatch => (comentarioId)=>{
    dispatch({type:"comentario_a_responder", payload:{comentarioId}})
}

const responderComentario = dispatch =>async ({respuesta, comentarioId, publicacionId})=> {
    try{
        console.log(`/posts/${publicacionId}/comentarios/${comentarioId}/respuestas`);
        const response = await settings.post(`/posts/${publicacionId}/comentarios/${comentarioId}/respuestas`, JSON.stringify({texto: respuesta}), {headers: {'Content-Type':'application/json'}});
        console.log("response",response.data);
        dispatch({type:"comentarios", payload: {comentarios: response.data.comentarios}})
        
        console.log(`respuestas en comentario ${comentarioId}`, response.data.comentarios.filter(com=>com.id === comentarioId)[0].respuestas.length);
    }catch(e){
        console.log(e);
    }
}

const eliminarRespuesta = dispatch => async ({publicacionId,comentarioId,respuestaId})=>{
    try{
        console.log(`/posts/${publicacionId}/comentarios/${comentarioId}/respuestas/${respuestaId}`);
        await settings.delete(`/posts/${publicacionId}/comentarios/${comentarioId}/respuestas/${respuestaId}`);
        dispatch({type:"deleteResponse", payload:{comentarioId, respuestaId}})
    } catch(e) {
        console.log(e);
    }
}

const initialState = {
    comentarios: [],
    comentario_a_responder: {id:-1, usuario:""}
}


export const {Context, Provider} = crearContext(
    ComentariosReducer,
    {crearComentario, setComentarios, eliminarComentario, setComentarioAResponder, responderComentario, eliminarRespuesta},
    initialState,
);