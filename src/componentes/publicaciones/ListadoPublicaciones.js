import React from 'react';
import { View } from 'react-native';
import BotonOrden from '../muro/BotonOrden';
import Publicacion from './Publicacion';

const ListadoPublicaciones = ({publicaciones}) => {

  return (
    <View>
    {publicaciones.map((publicacion,index)=>(
      <Publicacion key={index} publicacion={publicacion}/>
    ))}
    </View>
  );
}

export default ListadoPublicaciones;