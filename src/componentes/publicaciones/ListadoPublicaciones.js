import React from 'react';
import Publicacion from './Publicacion';

const ListadoPublicaciones = ({publicaciones}) => {

  return (
    publicaciones.map(publicacion=>(
      <Publicacion publicacion={publicacion}/>
    ))
  );
}

export default ListadoPublicaciones;