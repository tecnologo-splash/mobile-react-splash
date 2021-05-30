import React, { useContext } from 'react';
import { View } from 'react-native';
import SeguidoresSeguidos from '../componentes/perfil/SeguidoresSeguidos';
import {Context as PerfilContext} from '../context/PerfilContext';

const Seguidores = () => {
    const {state:{seguidores}} = useContext(PerfilContext);
  return (
      <SeguidoresSeguidos lista={seguidores}/>
  );
}

export {Seguidores};