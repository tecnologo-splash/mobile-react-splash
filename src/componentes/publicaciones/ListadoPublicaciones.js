import React from 'react';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';
import Publicacion from './Publicacion';

const ListadoPublicaciones = ({publicaciones}) => {

  console.log('publicaciones',publicaciones.length);
  return (
    <FlatList
    data={publicaciones}
    keyExtractor={item=>item.id.toString()}
    renderItem={({item})=>(
      <Publicacion publicacion={item} usuario={item.usuario_comun} />
    )}/>
  );
}

export default ListadoPublicaciones;