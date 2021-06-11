import React from 'react';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';
import Publicacion from './Publicacion';

const ListadoPublicaciones = ({publicaciones}) => {

  console.log('publicaciones',publicaciones);
  if(publicaciones){
    return (
      <FlatList
      data={publicaciones}
      keyExtractor={item=>item.id}
      renderItem={({item})=>(
        <Publicacion publicacion={item}/>
      )}/>
    );
  }
  return null;
}

export default ListadoPublicaciones;