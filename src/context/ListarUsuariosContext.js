import crearContext from "./crearContext";
import settings from '../config/settings';
import { filtroListadoUsuarios } from "../componentes/filtros";

const ListarUsuariosReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'listarUsuarios':
            return {...state, usuarios: action.payload.usuarios}
        case 'seguir':
            var todosUsuarioMenosSeguido = state.usuarios.filter(item => item.id != action.payload);
            var usuarioSeguido = state.usuarios.find(item=>item.id==action.payload);
            return {...state,usuarios: [...todosUsuarioMenosSeguido,{...usuarioSeguido, lo_sigo:true}]};
        case 'dejarDeSeguir':
            var todosUsuarioMenosNoSeguido = state.usuarios.filter(item => item.id != action.payload);
            var usuarioNoSeguido = state.usuarios.find(item=>item.id==action.payload);
            return {...state,usuarios: [...todosUsuarioMenosNoSeguido,{...usuarioNoSeguido, lo_sigo: false}]};
        default:
            return state;
    }
}

const listarUsuariosParaSeguir = dispatch => async ({filtro,valor}) => {
    try{
        const endpoint = `/users?activo=true&bloqueado=false&${filtro}=${valor}`;
        console.log(endpoint);
        const response = await settings.get(`/users?activo=true&bloqueado=false&${filtro}=${valor}`);
        dispatch({type:'listarUsuarios', payload: {usuarios: response.data.content}});
        console.log(response.data.content.length);
    }catch(e){
        console.log(e);
    }
}

const seguirUsuario = dispatch => async (idUsuarioASeguir) => {
    try{
        const endpoint = `/seguidores/seguir/${idUsuarioASeguir}`;
        console.log(endpoint);
        const response = await settings.put(`/seguidores/seguir/${idUsuarioASeguir}`);
        dispatch({type: "seguir", payload: idUsuarioASeguir});
    }catch(e){
        console.log(e);
    }
}

const dejarDeSeguirUsuario = dispatch => async (idUsuarioADejarDeSeguir) => {
    try{
        const endpoint = `/seguidores/dejardeseguir/${idUsuarioADejarDeSeguir}`;
        console.log(endpoint);
        const response = await settings.delete(`/seguidores/dejardeseguir/${idUsuarioADejarDeSeguir}`);
        dispatch({type: "dejarDeSeguir", payload: idUsuarioADejarDeSeguir});
    }catch(e){
        console.log(e);
    }
}

const cambiarValor = (dispatch) => ({variable,valor}) =>{
    dispatch({type: 'cambiarValor', payload: {variable, valor}})
}

const initialState = {
    usuarios: [],
    buscar:'',
    filtro: filtroListadoUsuarios._usuario
}

export const {Context, Provider} = crearContext(
    ListarUsuariosReducer,
    {listarUsuariosParaSeguir, cambiarValor, seguirUsuario, dejarDeSeguirUsuario},
    initialState
);