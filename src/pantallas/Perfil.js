import React, {useContext,useEffect} from 'react';
import { View } from 'react-native';
import Cargando from '../componentes/Cargando';
import { filtroSeguidos } from '../config/filtros';
import PerfilBody from '../componentes/perfil/PerfilBody';
import { colores } from '../config/colores';
import {Context as PerfilContext} from '../context/PerfilContext';


const Perfil = () => {

  const {state:{currentUser, cargando, amigos}, getInfo, getSeguidores, getSeguidos, getCantAmigos} = useContext(PerfilContext);

  useEffect(()=>{
    getInfo();
    getSeguidores({filtro: filtroSeguidos._usuario,valor:'',page:0});
    getSeguidos({filtro: filtroSeguidos._usuario,valor:'',page:0});
    getCantAmigos({usuarioId: currentUser.id});
  },[]);
  
  return (
    <View style={{flex: 1}}>
      <PerfilBody 
        usuario={currentUser} 
        cantSeguidores={amigos.usuarios_que_me_siguen} 
        cantSeguidos={amigos.usuarios_que_yo_sigo}
      />
      <Cargando estaCargando={cargando} color= {colores.appDefault} />
    </View>
  );
  
}



export {Perfil};