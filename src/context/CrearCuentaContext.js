import settings from "../config/settings";
import crearContext from "./crearContext";

const CrearCuentaReducer = (state, action)=>{
    switch(action.type){
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
        console.log(usuario);
        await settings.post('users/sign-up', JSON.stringify(usuario),
        {headers: {'Content-Type': "application/json"}});
        
    }catch(e){
        dispatch({type: 'onError', payload: {error: {tipo:"USUARIO_EXISTENTE", mensaje: "El Correo o Nombre de usuario ya existe en otro usuario, por favor ingresa uno nuevo"}}});
    }
    
}

const cambiarValor = (dispatch) => ({variable, valor}) =>{
    console.log(variable, valor);
    dispatch({type: "cambiarValor", payload: {variable, valor}});
}

const cambiarFecha = (dispatch) => (date) =>{
    console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`);
    dispatch({type: "cambiarFecha",payload:{date}});
}

const validarPassword = (dispatch) => ({clave, confirmar}) =>{
    if(clave!=confirmar){
        dispatch({type: "onError",payload: {error: {tipo: "PASSWORDS_NO_COINCIDEN", mensaje: "La password y la confirmación no coinciden"}}});
        return false;
    }
    return true;
    
}

export const {Context, Provider} = crearContext(
    CrearCuentaReducer,
    {crearCuenta, cambiarValor, cambiarFecha, validarPassword},
    {   
        usuario: null, 
        correo: null, 
        nombre: null, 
        apellido: null, 
        clave: null, 
        confirmar: null, 
        fecha: new Date(),
        genero: 'OTRO',
        error: null
    }
);
