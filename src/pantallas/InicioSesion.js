import React, {useContext, useEffect} from 'react';
import FormularioInicioSesion from '../componentes/inicio-sesion/FormularioInicioSesion';
import {LinearGradient} from 'expo-linear-gradient';
import {Context as InicioSesionContext} from '../context/InicioSesionContext'
import { getCurrentInfo } from '../servicios/infoService';
import {Context as PerfilContext} from '../context/PerfilContext';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

const InicioSesion = ({navigation}) => {
  const {state:{token}, actualizarToken} = useContext(InicioSesionContext);

  const {state:{currentUser}} = useContext(PerfilContext);

  useEffect(()=>{
    console.log("token: ",token);
    if(token === null || token === undefined){
      console.log("Entro a useEffect");
      actualizarToken();
    }else{
      navigation.navigate('BottomTab');
    }

    
      
      {currentUser.id && unsubscribe(`users-${currentUser.id}`)}
  
    
  },[token])


  const unsubscribe = interest => {
    RNPusherPushNotifications.unsubscribe(
        interest,
        (statusCode, response) => {
//        console.tron.logImportant(statusCode, response);
        },
        () => {
//        console.tron.logImportant('Success');
        }
    );
  };

  return (
    <LinearGradient colors={['#6d31bf','#3c1053']} style={{flex:1}}>
        <FormularioInicioSesion />
    </LinearGradient>
  );
}

export {InicioSesion};