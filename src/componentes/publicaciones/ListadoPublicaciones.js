import React from 'react';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';
import Publicacion from './Publicacion';

const ListadoPublicaciones = ({publicaciones, onEnd}) => {

  return (
    <FlatList
    data={publicaciones}
    keyExtractor={item=>item.id.toString()}
    onEndReached={()=>onEnd()}
    renderItem={({item})=>(
      <Publicacion publicacion={item}/>
    )}/>
  );
}

export default ListadoPublicaciones;