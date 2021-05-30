import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilReducer = (state,action) => {
    switch(action.type){
        case 'getSeguidores':
            return {...state, seguidores: action.payload.seguidores};
        case 'getSeguidos':
            return {...state, seguidos: action.payload.seguidos};
        case 'getInfo':
            return {...state, currentUser: action.payload.userInfo};
        default:
            return state;
    }
}

function getToken(){
    return AsyncStorage.getItem("tokenSplash");
}

const getInfo = (dispatch) => async () =>{
    
    try {
        const response = await settings.get('/users/info', {headers: {'Content-Type': "application/json"}} );

        dispatch({type: 'getInfo', payload: {userInfo:response.data}});
        console.log(response.data);

    } catch (e) {
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const getSeguidores = (dispatch) => async () =>{
    try{
        dispatch({type:'getSeguidores', payload:{ seguidores: []}})
    }catch(e){
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const getSeguidos = (dispatch) => async () =>{
    try{
        const response = await settings.get('/users/siguiendo');
        console.log(response);
        dispatch({type:'getSeguidos', payload:{ seguidos: response.data}})
    }catch(e){
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const initialState = {
    currentUser: {},
    seguidores:[],
    seguidos:[]
}

export const {Context, Provider} = crearContext(
    PerfilReducer,
    {getInfo, getSeguidores, getSeguidos},
    initialState
);