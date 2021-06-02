import React, {useContext,useEffect} from 'react';
import { filtroSeguidos } from '../componentes/filtros';
import PerfilBody from '../componentes/perfil/PerfilBody';
import {Context as PerfilContext} from '../context/PerfilContext';


const Perfil = ({navigation}) => {

  const {state:{currentUser, seguidores, seguidos}, getInfo, getSeguidores, getSeguidos} = useContext(PerfilContext);

  useEffect(()=>{
    getInfo();
    getSeguidores();
    getSeguidos({filtro: filtroSeguidos._usuario,valor:''});
  },[]);
  
  return (
    <PerfilBody 
      usuario={currentUser} 
      cantSeguidores={seguidores.length} 
      cantSeguidos={seguidos.length}
    />
  );
}



export {Perfil};