import crearContext from "./crearContext";
import settings from '../config/settings';

const ComentariosReducer = (state,action) => {
    switch(action.type){
        case 'comentarios':
            return {...state, comentarios: action.payload.comentarios};
        case 'deleteComment':
            return {...state, comentarios: state.comentarios.filter(coment=>coment.id !=action.payload.comentarioId)};
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

const initialState = {
    comentarios: []
}

export const {Context, Provider} = crearContext(
    ComentariosReducer,
    {crearComentario, setComentarios, eliminarComentario},
    initialState,
);