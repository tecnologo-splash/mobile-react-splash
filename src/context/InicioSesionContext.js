import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

const InicioSesionReducer = (state,action) => {
    switch(action.type){
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'inicioSesion':
            return {...state, token: action.payload.token, error: {titulo:null, cuerpo:null}, entrar:true};
        case 'confirmErrorInicioSesion':
            return {...state, error:{titulo:null, cuerpo:null}};
        case 'cerrarSesion':
            return {...state, token: null, usuario: null, password:null, error:{titulo:null, cuerpo:null}};
        case 'recuperarPassword':
            return {...state, recuperar2: true, recuperar:false};
        case 'confirmErrorRecuperarPassword':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, hayError: true}, recuperar:true};
        case 'recuperarPassword2':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, hayError: true}, recuperar2:false};
        case 'confirmErrorRecuperarPassword2':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, hayError: true}, recuperar2:true};
        case 'onError':
            return {...state, recuperar: false, recuperar2: false, error: action.payload.error}
        default:
            return state;
    }
}

const cambiarValor = (dispatch) => ({variable,valor}) =>{
    dispatch({type: 'cambiarValor', payload: {variable, valor}})
}

const inicioSesion = (dispatch) => async ({usuario, password}) =>{
    if(usuario){
        if(usuario.includes("@")){
            var credenciales = { correo: usuario, clave: password};
        }else{
            var credenciales = { usuario: usuario, clave: password};
        }
    }
    try {
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        const response = await settings.post('/users/auth', 
        JSON.stringify(credenciales), 
        {headers: {'Content-Type': "application/json"}}
        );

        await AsyncStorage.setItem('tokenSplash', response.data.token);
        dispatch({type: 'inicioSesion', payload: {token:response.data.token}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    } catch (e) {
        dispatch({type: 'onError', payload: {error: {titulo: 'Error al inicio de sesion', cuerpo: 'Usuario y/o Password incorrecto', anterior: 'confirmErrorInicioSesion', hayError: true}}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const actualizarToken = (dispatch) => async() =>{
    const tokenStorage = await AsyncStorage.getItem('tokenSplash');
    if(tokenStorage){
        dispatch({type: 'cambiarValor', payload: {variable: 'token', valor: tokenStorage}});
    }
}

const cerrarSesion = (dispatch) => async () =>{
    dispatch({type: 'cerrarSesion'});
    dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
    await AsyncStorage.removeItem('tokenSplash');
    dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
}

const recuperarPassword = (dispatch) => async (usuario) =>{
    var correo = {correo: usuario};
    try{
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
        await settings.post('/users/recovery-password',
        JSON.stringify(correo),
        {headers: {'Content-Type': "application/json"}}
        );
        dispatch({type: 'recuperarPassword'});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }catch (e) {
        dispatch({type:'onError', payload: {error: {titulo: 'Error en el correo', cuerpo: 'Ese correo no se encuentra registrado', anterior: 'confirmErrorRecuperarPassword', hayError: true}}});
        dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
    }
}

const recuperarPassword2 = (dispatch) => async (usuario, codigo, clave, clave2) =>{
    if(usuario===null || usuario===''){
        dispatch({type:'onError', payload: {error: {titulo: 'Error en el correo', cuerpo: 'El correo ingresado fue perdido', anterior: 'confirmErrorRecuperarPassword', hayError: true}}});
    }else{
        if(codigo===null || codigo===''){
            dispatch({type:'onError', payload: {error: {titulo: 'Error en el c??digo', cuerpo: 'C??digo no puede ser vac??o', anterior: 'confirmErrorRecuperarPassword2', hayError: true}}});
        }else{
            if(clave!=clave2 || clave===null || clave===''){
                dispatch({type:'onError', payload: {error: {titulo: 'Error en la clave', cuerpo: 'Clave y confirmar no son iguales', anterior: 'confirmErrorRecuperarPassword2', hayError: true}}});
            }else{
                var correo = {correo: usuario, codigo: codigo, clave: clave};
                try{
                    dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: true}});
                    await settings.post('/users/recovery-password',
                    JSON.stringify(correo),
                    {headers: {'Content-Type': "application/json"}}
                    );
                    dispatch({type:'onError', payload: {error: {titulo: 'Exito en recuperar contrase??a', cuerpo: 'Su nueva contrase??a a sido actualizada', anterior: 'recuperarPassword2', hayError: false}}});
                    dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
                }catch (e) {
                    dispatch({type:'onError', payload: {error: {titulo: 'Error en el c??digo', cuerpo: 'El c??digo ingresado no es correcto', anterior: 'confirmErrorRecuperarPassword2', hayError: true}}});
                    dispatch({type: 'cambiarValor', payload:{variable: 'cargando', valor: false}});
                }
            }
        }
    }
}

const volverError = (dispatch) => (anterior) =>{
    console.log(anterior)
    dispatch({type: anterior});
}

export const {Context, Provider} = crearContext(
    InicioSesionReducer,
    {cambiarValor, inicioSesion, actualizarToken, cerrarSesion, recuperarPassword, recuperarPassword2, volverError},
    {
        usuario: null,
        password:null,
        error:{titulo: null, cuerpo: null, anterior: null, hayError: false},
        token:null,
        recuperar:false,
        recuperar2:false,
        codigo: null,
        clave: null, 
        clave2: null, 
        recuperado:false,
        entrar:false,
        cargando: false
    }
);
