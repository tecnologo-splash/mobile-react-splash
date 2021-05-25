import crearContext from "./crearContext";
import settings from '../config/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilReducer = (state,action) => {
    switch(action.type){
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
        console.log(response);

    } catch (e) {
        console.log(e);
        dispatch({type: 'onError', payload: {error: e}});
    }
}

const initialState = {
    currentUser: {}
}

export const {Context, Provider} = crearContext(
    PerfilReducer,
    {getInfo},
    initialState
);