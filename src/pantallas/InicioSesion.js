import React from 'react';
import FormularioInicioSesion from '../componentes/FormularioInicioSesion';
import {LinearGradient} from 'expo-linear-gradient';

const InicioSesion = () => {
  return (
    <LinearGradient colors={['#6d31bf','#3c1053']} style={{flex:1}}>
        <FormularioInicioSesion />
    </LinearGradient>
  );
}

export default InicioSesion;