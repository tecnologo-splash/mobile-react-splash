import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList} from 'react-native-bidirectional-infinite-scroll';
import {Avatar, ListItem} from 'react-native-elements';
import {Context as PerfilContext} from '../../context/PerfilContext';
import {useNavigation} from '@react-navigation/native';
import { baseUriMultimedia } from '../../config/configs';

const ListadoSeguidores = ({usuarios,onEnd}) => {
  const navigation = useNavigation();
  return (
    <FlatList
    data={usuarios}
    keyExtractor={item => item.usuario}
    onEndReached={()=>onEnd()}
    renderItem={({item})=>(
      <TouchableOpacity onPress={()=>navigation.navigate('PerfilExterno', {usuario:{...item, lo_sigo: true}})}>
        <ListItem>
          <Avatar 
            rounded 
            source={item.url_perfil ? { uri: `${baseUriMultimedia}${item.url_perfil}` } : require('../../../assets/perfilDefault.jpg')}
            size="medium"
          >
          </Avatar>
          <ListItem.Content>
            <ListItem.Title>{item.nombre} {item.apellido}</ListItem.Title>
            <ListItem.Subtitle>{item.usuario}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      )}
      />
  );
}

export default ListadoSeguidores;