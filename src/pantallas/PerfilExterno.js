import React, { useContext, useEffect } from 'react';
import PerfilExternoBody from '../componentes/perfil/externo/PerfilExternoBody';
import Cargando from '../componentes/Cargando';
import {Context as PerfilContext} from '../context/PerfilContext';
import { colores } from '../config/colores';

const PerfilExterno = ({route}) => {
    const {usuarioId} = route.params;
    const {state:{user, cargando},getInfoExterno} = useContext(PerfilContext);

    useEffect(()=>{
      getInfoExterno({userId: usuarioId});
    },[]);

    if(user){
        return (
          <>
          <PerfilExternoBody usuario= {user} />
          <Cargando estaCargando={cargando} color= {colores.appDefault} />
          </>
      );
    } else {
      return null;
    }
 
}

export {PerfilExterno};