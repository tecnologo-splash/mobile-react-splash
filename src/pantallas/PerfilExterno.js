import React, { useContext, useEffect } from 'react';
import PerfilExternoBody from '../componentes/perfil/externo/PerfilExternoBody';
import {Context as PerfilContext} from '../context/PerfilContext';

const PerfilExterno = ({route}) => {
    const {usuarioId} = route.params;
    const {state:{user},getInfoExterno} = useContext(PerfilContext);

    useEffect(()=>{
      getInfoExterno({userId: usuarioId});
    },[]);

    if(user){
        return (
          <PerfilExternoBody usuario= {user} />
      );
    } else {
      return null;
    }
 
}

export {PerfilExterno};