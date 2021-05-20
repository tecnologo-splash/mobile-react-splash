import React, {useContext, useEffect} from 'react';
import FormularioInicioSesion from '../componentes/inicio-sesion/FormularioInicioSesion';
import {LinearGradient} from 'expo-linear-gradient';
import {Context as InicioSesionContext} from '../context/InicioSesionContext'

const InicioSesion = ({navigation}) => {
  const {state:{token}, actualizarToken} = useContext(InicioSesionContext);

  useEffect(()=>{
    console.log("token: ",token);
    if(token === null || token === undefined){
      console.log("Entro a useEffect");
      actualizarToken();
    }else{
      navigation.navigate('BottomTab');
    }
  },[token])
  return (
    <LinearGradient colors={['#6d31bf','#3c1053']} style={{flex:1}}>
        <FormularioInicioSesion />
    </LinearGradient>
  );
}

export {InicioSesion};