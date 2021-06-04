import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import Cargando from '../componentes/Cargando';
import SeguidoresSeguidos from '../componentes/perfil/SeguidoresSeguidos';
import { colores } from '../config/colores';
import {Context as PerfilContext} from '../context/PerfilContext';

const Seguidos = () => {
    const {state:{seguidos,filtro,buscar, cargando},getSeguidos} = useContext(PerfilContext);

    useEffect(()=>{
      getSeguidos({valor:buscar,filtro});
    },[filtro,buscar]);
    
  return (
    <View>
      <SeguidoresSeguidos lista={seguidos}/>
      <Cargando estaCargando={cargando} color={colores.appDefault} />
    </View>
  );
}

export {Seguidos};