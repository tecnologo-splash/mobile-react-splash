import settings from "../config/settings";
import crearContext from "./crearContext";

const CrearCuentaReducer = (state, action)=>{
    switch(action.type){
        case 'crearCuenta':
            return {...state, error:null}
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'cambiarFecha':
            return {...state, fecha: action.payload.date};
        case 'onError':
            return {...state, error: action.payload.error};
        default:
            return state;
    }
}

const crearCuenta = (dispatch) => async (usuario)=> {
    try{
        dispatch({type: "cambiarValor", payload: {variable:"cargando",valor: true}});
        console.log(usuario);
        await settings.post('users/sign-up', JSON.stringify(usuario),
        {headers: {'Content-Type': "application/json"}});
        dispatch({type:'crearCuenta'});
        dispatch({type: "cambiarValor", payload: {variable:"cargando",valor: false}});
    }catch(e){
        dispatch({type: 'onError', payload: {error: {tipo:"USUARIO_EXISTENTE", mensaje: "El Correo o Nombre de usuario ya existe en otro usuario, por favor ingresa uno nuevo", activacion: null}}});
        dispatch({type: "cambiarValor", payload: {variable:"cargando",valor: false}});
    }
    
}

const cambiarValor = (dispatch) => ({variable, valor}) =>{
    dispatch({type: "cambiarValor", payload: {variable, valor}});
}

const cambiarFecha = (dispatch) => (date) =>{
    dispatch({type: "cambiarFecha",payload:{date}});
}

const validarPassword = (dispatch) => ({clave, confirmar}) =>{
    if(clave!=confirmar){
        dispatch({type: "onError",payload: {error: {tipo: "PASSWORDS_NO_COINCIDEN", mensaje: "La password y la confirmación no coinciden"}}});
        return false;
    }
    return true;
}

const activarCuenta = (dispatch) => async (activacion) =>{
    try{
        dispatch({type: "cambiarValor", payload: {variable:"cargando",valor: true}});
        await settings.post('users/activation', JSON.stringify(activacion),
        {headers: {'Content-Type': "application/json"}});
        dispatch({type: "cambiarValor", payload: {variable:"error",valor: null}});
        dispatch({type: "cambiarValor", payload: {variable:"entrar",valor: true}});
        dispatch({type: "cambiarValor", payload: {variable:"cargando",valor: false}});
    }catch(e){
        dispatch({type: 'onError', payload: {error: e}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

export const {Context, Provider} = crearContext(
    CrearCuentaReducer,
    {crearCuenta, cambiarValor, cambiarFecha, validarPassword, activarCuenta},
    {   
        usuario: null, 
        correo: null, 
        nombre: null, 
        apellido: null, 
        clave: null, 
        confirmar: null, 
        fecha: new Date(),
        genero: 'OTRO',
        error: null,
        claveActivacion: null,
        entrar:false,
        cargando: false
    }
);
