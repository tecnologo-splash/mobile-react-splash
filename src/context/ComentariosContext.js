import crearContext from "./crearContext";

const ComentariosReducer = (state,action) => {
    switch(action.type){
        default:
            return state;
    }
}

const initialState = {
}

export const {Context, Provider} = crearContext(
    ComentariosReducer,
    {},
    initialState,
);