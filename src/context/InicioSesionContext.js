import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InicioSesionReducer = (state,action) => {
    switch(action.type){
        case 'inicioSesion':
            return {...state, token: action.payload.token, error: null, entrar:true};
        case 'onError':
            return {...state, recuperar: false, recuperar2: false, error: action.payload.error}
        case 'cambiarValor':
            return {...state, [action.payload.variable]: action.payload.valor};
        case 'cerrarSesion':
            return {...state, token: null, usuario: null, password:null, error:null};
        case 'recuperarPassword':
            return {...state, recuperar2: !state.recuperar2, recuperar:false};
        case 'recuperarPassword2':
            return {...state, recuperado: false, recuperar2:false};
        case 'borrarError':
            return {...state, error:{titulo:null, cuerpo:null}};
        default:
            return state;
    }
}

const borrarError = (dispatch) => () =>{
    dispatch({type: 'borrarError'});
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
        console.log(response.data.token);

    } catch (e) {
        dispatch({type: 'onError', payload: {error: {titulo: 'Error al inicio de sesion', cuerpo: 'Usuario y/o Password incorrecto'}}});
    }
    
}

const cambiarValor = (dispatch) => ({variable,valor}) =>{
    dispatch({type: 'cambiarValor', payload: {variable, valor}})
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
        console.log(correo)
        await settings.post('/users/recovery-password',
        JSON.stringify(correo),
        {headers: {'Content-Type': "application/json"}}
        );
        dispatch({type: 'recuperarPassword'});
    }catch (e) {
        console.log(e);
        dispatch({type:'onError', payload: {error: {titulo: 'Error en el correo', cuerpo: 'Error'}}});
    }
    
    console.log('recuperarPassword');
}

const recuperarPassword2 = (dispatch) => async (usuario, codigo, clave) =>{
    var correo = {correo: usuario, codigo: codigo, clave: clave};
    try{
        console.log(correo)
        await settings.post('/users/recovery-password',
        JSON.stringify(correo),
        {headers: {'Content-Type': "application/json"}}
        );
        dispatch({type: 'recuperarPassword2'});
    }catch (e) {
        console.log(e);
        dispatch({type:'onError', payload: {error: {titulo: 'Error en el código', cuerpo: 'Error'}}});
    }
    
    console.log('recuperarPassword2');
}

const validarPassword = () => ({clave, clave2}) =>{
    if(clave!=clave2 || clave===null || clave===''){
        return false;
    }
    return true;

}

export const {Context, Provider} = crearContext(
    InicioSesionReducer,
    {inicioSesion, cambiarValor, actualizarToken, cerrarSesion, recuperarPassword, recuperarPassword2, validarPassword, borrarError},
    {
        usuario: null,
        password:null,
        error:{titulo: null, cuerpo: null},
        token:null,
        recuperar:false,
        recuperar2:false,
        clave: null, 
        clave2: null, 
        recuperado:false,
        entrar:false}
);