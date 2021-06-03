import React from 'react';
import { View } from 'react-native';
import PerfilExternoBody from '../componentes/perfil/externo/PerfilExternoBody';

const PerfilExterno = ({route, navigation}) => {
    const {usuario} = route.params;

  return (
      <PerfilExternoBody usuario= {usuario} />
  );
}

export {PerfilExterno};