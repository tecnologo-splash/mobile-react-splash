import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlatList} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import ListaBotones from './ListaBotones';
const ListadoUsuarios = ({usuarios}) => {
  return (
    <View>
      <ListaBotones/>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({item})=>(
          <TouchableOpacity onPress={console.log("go to profile")}>
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
      </View>
  );
}

export default ListadoUsuarios;