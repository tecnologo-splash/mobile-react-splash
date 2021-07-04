import crearContext from "./crearContext";
import settings from '../config/settings';
import { filtroListadoUsuarios } from "../config/filtros";
import { requestSizeListarSeguidos, requestSizeListarSugeridos, requestSizeListarUsuarios } from "../config/maximos";

const ListarUsuariosReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'listarUsuarios':
            return {...state, usuarios:[...state.usuarios, ...action.payload.usuarios], cargando: false};
        case 'agregarUsuariosALista':
            return {...state, usuarios: action.payload.usuarios, cargando:false}
        case 'listarSugeridos':
            return {...state, sugeridos: action.payload.sugeridos}
        case 'appendSugeridos':
            return {...state, sugeridos: [...state.sugeridos, ...action.payload.sugeridos]}
        case 'seguir':
            var todosUsuarioMenosSeguido = state.usuarios.filter(item => item.id != action.payload);
            var usuarioSeguido = state.usuarios.find(item=>item.id==action.payload);
            return {...state,usuarios: [...todosUsuarioMenosSeguido,{...usuarioSeguido, lo_sigo:true}]};
        case 'seguirSugerido':
            var todosUsuarioMenosSeguido = state.sugeridos.filter(item => item.id != action.payload);
            var usuarioSeguido = state.sugeridos.find(item=>item.id==action.payload);
            return {...state,sugeridos: [...todosUsuarioMenosSeguido,{...usuarioSeguido, lo_sigo:true}]};
        case 'dejarDeSeguir':
            var todosUsuarioMenosNoSeguido = state.usuarios.filter(item => item.id != action.payload);
            var usuarioNoSeguido = state.usuarios.find(item=>item.id==action.payload);
            return {...state,usuarios: [...todosUsuarioMenosNoSeguido,{...usuarioNoSeguido, lo_sigo: false}]};
        case 'dejarDeSeguirSugerido':
            var todosUsuarioMenosNoSeguido = state.sugeridos.filter(item => item.id != action.payload);
            var usuarioNoSeguido = state.sugeridos.find(item=>item.id==action.payload);
            return {...state,sugeridos: [...todosUsuarioMenosNoSeguido,{...usuarioNoSeguido, lo_sigo: false}]};
        default:
            return state;
    }
}

const listarUsuariosParaSeguir = dispatch => async ({filtro,valor, page, currentUserId}) => {
    try{
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        const endpoint = `/users?page=${page}&size=${requestSizeListarUsuarios}activo=true&bloqueado=false&${filtro}=${valor}`;
        console.log(endpoint);
        const response = await settings.get(`/users?page=${page}&size=${requestSizeListarUsuarios}&activo=true&bloqueado=false&${filtro}=${valor}`);
        console.log('response.data.content.length', response.data.content.length);
        if(page==0){
            dispatch({type:'agregarUsuariosALista', payload: {usuarios: response.data.content.filter(user=>user.id!=currentUserId)}});
        }else{
            dispatch({type:'listarUsuarios', payload: {usuarios: response.data.content.filter(user=>user.id!=currentUserId)}});
        }
        
    }catch(e){
        console.log(e);
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const listarUsuariosSugeridos= dispatch => async ({page, currentUser}) => {
    try{
        console.log(`/seguidores/recomendados?page=${page}&size=${requestSizeListarSugeridos}`);
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        const response = await settings.get(`/seguidores/recomendados?page=${page}&size=${requestSizeListarSugeridos}`);
        // if(page == 0){
            console.log("response.data en listar usuarios seguidos ",response.data.length)
            console.log(response.data.filter(sugerido=>sugerido.usuario!=currentUser).length);
            dispatch({type:'listarSugeridos', payload: {sugeridos: response.data.filter(sugerido=>sugerido.usuario!=currentUser)}});
        // }else{
        //     dispatch({type:'appendSugeridos', payload: {sugeridos: response.data.filter(sugerido=>sugerido.usuario!=currentUser)}});
        // }
    }catch(e){
        console.log("error en listar usuarios sugeridos",e);
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const seguirUsuario = dispatch => async (idUsuarioASeguir) => {
    try{
        const endpoint = `/seguidores/seguir/${idUsuarioASeguir}`;
        console.log(endpoint);
        const response = await settings.put(`/seguidores/seguir/${idUsuarioASeguir}?page=0&size=${requestSizeListarSugeridos}`);
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
    sugeridos: [],
    buscar:'',
    filtro: filtroListadoUsuarios._usuario,
    cargando: false
}

export const {Context, Provider} = crearContext(
    ListarUsuariosReducer,
    {listarUsuariosParaSeguir, listarUsuariosSugeridos, cambiarValor, seguirUsuario, dejarDeSeguirUsuario},
    initialState
);