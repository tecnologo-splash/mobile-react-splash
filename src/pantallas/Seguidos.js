import React, { useContext, useEffect } from 'react';
import SeguidoresSeguidos from '../componentes/perfil/SeguidoresSeguidos';
import {Context as PerfilContext} from '../context/PerfilContext';

const Seguidos = () => {
    const {state:{seguidos}} = useContext(PerfilContext);
  return (
      <SeguidoresSeguidos lista={seguidos}/>
  );
}

export {Seguidos};