import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import ListaBotones from './ListaBotones';
import {Context as ListarUsuariosContext} from '../../context/ListarUsuariosContext';

const ListadoUsuarios = ({usuarios}) => {
  const{seguirUsuario,dejarDeSeguirUsuario}= useContext(ListarUsuariosContext);
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
              {item.lo_sigo ?
                  <Text onPress={()=>dejarDeSeguirUsuario(item.id)}>Dejar de seguir</Text>
                  :
                  <Text onPress={()=>seguirUsuario(item.id)}>Seguir</Text>
              }
            </ListItem>
          </TouchableOpacity>
          )}
          />
      </View>
  );
}

export default ListadoUsuarios;