import React, { useContext, useEffect } from 'react';
import SeguidoresSeguidos from '../componentes/perfil/SeguidoresSeguidos';
import {Context as PerfilContext} from '../context/PerfilContext';

const Seguidos = () => {
    const {state:{seguidos,filtro,buscar},getSeguidos} = useContext(PerfilContext);

    useEffect(()=>{
      getSeguidos({valor:buscar,filtro});
    },[filtro,buscar]);
    
  return (
      <SeguidoresSeguidos lista={seguidos}/>
  );
}

export {Seguidos};