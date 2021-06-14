import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import SeguidoresSeguidos from '../componentes/perfil/SeguidoresSeguidos';
import {Context as PerfilContext} from '../context/PerfilContext';
import Cargando from '../componentes/Cargando';
import { colores } from '../config/colores';

const Seguidores = () => {
    const {state:{seguidores, filtro, buscar, cargando}, getSeguidores} = useContext(PerfilContext);
    const [page,setPage] = useState(0);


    useEffect(()=>{
      buscarSeguidores(0);
      setPage(0);
    },[filtro,buscar]);

    const buscarSeguidores = (pagina)=>{
      getSeguidores({valor:buscar,filtro,page: pagina});
      setPage(page+1);
    }

  return (
    <View>
      <SeguidoresSeguidos lista={seguidores} onEnd={()=>buscarSeguidores(page)}/>
      <Cargando estaCargando={cargando} color={colores.appDefault} />
    </View>  
  );
}

export {Seguidores};