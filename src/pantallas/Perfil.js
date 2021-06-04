import React, {useContext,useEffect} from 'react';
import { View } from 'react-native';
import Cargando from '../componentes/Cargando';
import { filtroSeguidos } from '../componentes/filtros';
import PerfilBody from '../componentes/perfil/PerfilBody';
import { colores } from '../config/colores';
import {Context as PerfilContext} from '../context/PerfilContext';


const Perfil = () => {

  const {state:{currentUser, cargando, seguidores, seguidos}, getInfo, getSeguidores, getSeguidos} = useContext(PerfilContext);

  useEffect(()=>{
    getInfo();
    getSeguidores();
    getSeguidos({filtro: filtroSeguidos._usuario,valor:''});
  },[]);
  
  return (
    <View style={{flex: 1}}>
      <PerfilBody 
        usuario={currentUser} 
        cantSeguidores={seguidores.length} 
        cantSeguidos={seguidos.length}
      />
      <Cargando estaCargando={cargando} color= {colores.appDefault} />
    </View>
  );
  
}



export {Perfil};