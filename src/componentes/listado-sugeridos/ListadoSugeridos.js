import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { FlatList} from 'react-native-bidirectional-infinite-scroll';
import {Avatar, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { baseUriMultimedia } from '../../config/configs';

const ListadoSugeridos = ({sugeridos, onEnd}) => {
  const navigation = useNavigation();

  const renderItem = useCallback(({item}) =>    
    <TouchableOpacity key={item.usuario_id.toString()} onPress={()=>navigation.navigate('PerfilExterno', {usuarioId: item.usuario_id, lo_sigo: false})} style={{margin: 5}}>
      <ListItem>
        
        <ListItem.Content style={{borderRadius: 20}}>
        <Avatar 
          rounded 
          source={item.url_perfil ? { uri: `${baseUriMultimedia}${item.url_perfil}` } : require('../../../assets/perfilDefault.jpg')}
          size="large"
        >
        </Avatar>
        <ListItem.Title>{item.nombre}</ListItem.Title>
        <ListItem.Title>{item.apellido}</ListItem.Title>
        <ListItem.Subtitle>{item.usuario}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>, []
  );

  const keyExtractor = useCallback((item)=> item.usuario_id.toString(), []);

  return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={sugeridos}
        keyExtractor={keyExtractor}
        onEndReached={()=>onEnd()}
        renderItem={renderItem}
      />
  );
}

export default ListadoSugeridos;