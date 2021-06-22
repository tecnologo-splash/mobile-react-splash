import React, {useContext,useEffect} from 'react';
import { View } from 'react-native';
import Cargando from '../componentes/Cargando';
import { filtroSeguidos } from '../config/filtros';
import PerfilBody from '../componentes/perfil/PerfilBody';
import { colores } from '../config/colores';
import {Context as PerfilContext} from '../context/PerfilContext';




const Perfil = () => {

  const {state:{currentUser, cargando}, getInfo, getSeguidores, getSeguidos} = useContext(PerfilContext);
  useEffect(()=>{
    getInfo();
    getSeguidores({filtro: filtroSeguidos._usuario,valor:'',page:0});
    getSeguidos({filtro: filtroSeguidos._usuario,valor:'',page:0});
  },[]);
  
  return (
    <View style={{flex: 1}}>
      <PerfilBody 
        usuario={currentUser} 
      />
      <Cargando estaCargando={cargando} color= {colores.appDefault} />
    </View>
  );
  
}



export {Perfil};