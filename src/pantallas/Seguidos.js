import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Cargando from '../componentes/Cargando';
import SeguidoresSeguidos from '../componentes/perfil/SeguidoresSeguidos';
import { colores } from '../config/colores';
import {Context as PerfilContext} from '../context/PerfilContext';

const Seguidos = () => {
    const [page,setPage] = useState(0);
    const {state:{seguidos,filtro,buscar, cargando},getSeguidos} = useContext(PerfilContext);

    useEffect(()=>{
      buscarSeguidos(0);
      setPage(0);
    },[filtro,buscar]);
    
    const buscarSeguidos = (pagina)=>{
      getSeguidos({valor:buscar,filtro,page: pagina});
      setPage(page+1);
    }
  return (
    <View>
      <SeguidoresSeguidos lista={seguidos} onEnd={()=>buscarSeguidos(page)}/>
      <Cargando estaCargando={cargando} color={colores.appDefault} />
    </View>
  );
}

export {Seguidos};