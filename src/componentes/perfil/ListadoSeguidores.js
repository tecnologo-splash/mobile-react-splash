import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {Context as PerfilContext} from '../../context/PerfilContext';
import {useNavigation} from '@react-navigation/native';

const ListadoSeguidores = ({usuarios}) => {
  const navigation = useNavigation();
  return (
    <FlatList
    data={usuarios}
    keyExtractor={item => item.usuario}
    renderItem={({item})=>(
      <TouchableOpacity onPress={()=>navigation.navigate('PerfilExterno', {usuario:{...item, lo_sigo: true}})}>
        <ListItem>
          <Avatar 
            rounded 
            source={item.url_perfil ? { uri: item.url_perfil } : require('../../../assets/perfilDefault.jpg')}
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