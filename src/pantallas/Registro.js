import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import Formulario from '../componentes/crear-cuenta/Formulario';
const Registro = () => {
  return (
    <LinearGradient colors={['#6d31bf','#3c1053']} style={{flex:1}}>
        <Formulario/>
    </LinearGradient>
  );
}

export {Registro};