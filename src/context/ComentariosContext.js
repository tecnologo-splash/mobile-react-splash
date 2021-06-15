import crearContext from "./crearContext";
import settings from '../config/settings';

const ComentariosReducer = (state,action) => {
    switch(action.type){
        default:
            return state;
    }
}

const crearComentario = dispatch => async ({text,publicacionId})=> {
    try{
        console.log("Texto de comentrio", text);
        console.log(`/posts/${publicacionId}/comentarios`);
        await settings.post(`/posts/${publicacionId}/comentarios`, JSON.stringify({texto: text}), {headers: {'Content-Type':'application/json'}});
    }catch(e){
        console.log(e);
    }

}

const initialState = {
}

export const {Context, Provider} = crearContext(
    ComentariosReducer,
    {crearComentario},
    initialState,
);