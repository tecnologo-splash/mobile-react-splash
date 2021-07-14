import React, {useCallback} from 'react';
import { View, FlatList } from 'react-native';
import Publicacion from './Publicacion';

const ListadoPublicaciones = ({publicaciones, onEnd, onRefresh}) => {

  return (
    <View>
    <FlatList
      data={publicaciones}
      keyExtractor={useCallback((item, index)=> index.toString())}
      onEndReachedThreshold={2}
      refreshing={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>(
        <Publicacion key={index} publicacion={item}/>
      )}
      onEndReached={()=>onEnd()}
      onRefresh={()=>onRefresh()}
    />
    </View>
  );
}

export default ListadoPublicaciones;