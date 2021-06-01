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
            return {...state, token: null, usuario: null, password:null, error:null};
        case 'recuperarPassword':
            return {...state, recuperar2: true, recuperar:false};
        case 'confirmErrorRecuperarPassword':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, styleError:null}, recuperar:true};
        case 'recuperarPassword2':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, styleError:null}, recuperar2:false};
        case 'confirmErrorRecuperarPassword2':
            return {...state, error:{titulo:null, cuerpo:null, anterior:null, styleError:null}, recuperar2:true};
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
        const response = await settings.post('/users/auth', 
        JSON.stringify(credenciales), 
        {headers: {'Content-Type': "application/json"}}
        );

        await AsyncStorage.setItem('tokenSplash', response.data.token);
        dispatch({type: 'inicioSesion', payload: {token:response.data.token}});
    } catch (e) {
        dispatch({type: 'onError', payload: {error: {titulo: 'Error al inicio de sesion', cuerpo: 'Usuario y/o Password incorrecto', anterior: 'confirmErrorInicioSesion', styleError: styles.error}}});
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
    await AsyncStorage.removeItem('tokenSplash');
}

const recuperarPassword = (dispatch) => async (usuario) =>{
    var correo = {correo: usuario};
    try{
        await settings.post('/users/recovery-password',
        JSON.stringify(correo),
        {headers: {'Content-Type': "application/json"}}
        );
        dispatch({type: 'recuperarPassword'});
    }catch (e) {
        dispatch({type:'onError', payload: {error: {titulo: 'Error en el correo', cuerpo: 'Ese correo no se encuentra registrado', anterior: 'confirmErrorRecuperarPassword', styleError: styles.error}}});
    }
}

const recuperarPassword2 = (dispatch) => async (usuario, codigo, clave, clave2) =>{
    if(usuario===null || usuario===''){
        dispatch({type:'onError', payload: {error: {titulo: 'Error en el correo', cuerpo: 'El correo ingresado fue perdido', anterior: 'confirmErrorRecuperarPassword', styleError: styles.error}}});
    }else{
        if(codigo===null || codigo===''){
            dispatch({type:'onError', payload: {error: {titulo: 'Error en el código', cuerpo: 'Código no puede ser vacío', anterior: 'confirmErrorRecuperarPassword2', styleError: styles.error}}});
        }else{
            if(clave!=clave2 || clave===null || clave===''){
                dispatch({type:'onError', payload: {error: {titulo: 'Error en la clave', cuerpo: 'Clave y confirmar no son iguales', anterior: 'confirmErrorRecuperarPassword2', styleError: styles.error}}});
            }else{
                var correo = {correo: usuario, codigo: codigo, clave: clave};
                try{
                    await settings.post('/users/recovery-password',
                    JSON.stringify(correo),
                    {headers: {'Content-Type': "application/json"}}
                    );
                    dispatch({type:'onError', payload: {error: {titulo: 'Exito en recuperar contraseña', cuerpo: 'Su nueva contraseña a sido actualizada', anterior: 'recuperarPassword2', styleError: styles.success}}});
                }catch (e) {
                    dispatch({type:'onError', payload: {error: {titulo: 'Error en el código', cuerpo: 'El código ingresado no es correcto', anterior: 'confirmErrorRecuperarPassword2', styleError: styles.error}}});
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
        error:{titulo: null, cuerpo: null, anterior: null, styleError: null},
        token:null,
        recuperar:false,
        recuperar2:false,
        codigo: null,
        clave: null, 
        clave2: null, 
        recuperado:false,
        entrar:false}
);

const styles = StyleSheet.create({
    error:{
        color: "red"
    },
    success:{
        color: "green"
    },
});