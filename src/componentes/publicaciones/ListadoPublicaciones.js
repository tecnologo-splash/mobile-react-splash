import React from 'react';
import { View } from 'react-native';
import BotonOrden from '../muro/BotonOrden';
import Publicacion from './Publicacion';

const ListadoPublicaciones = ({publicaciones}) => {

  return (
    <View>
    {publicaciones.map(publicacion=>(
      <Publicacion publicacion={publicacion}/>
    ))}
    <BotonOrden/>
    </View>
  );
}

export default ListadoPublicaciones;