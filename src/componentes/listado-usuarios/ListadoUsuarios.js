import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>console.log("go to profile")}>
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
                  <Text style={{...styles.text, color: '#dd182f'}} onPress={()=>dejarDeSeguirUsuario(item.id)}>Dejar de seguir</Text>
                  :
                  <Text style={{...styles.text, color: '#296fe8'}} onPress={()=>seguirUsuario(item.id)}>Seguir</Text>
              }
            </ListItem>
          </TouchableOpacity>
          )}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'600',
    fontSize:15
  }
});

export default ListadoUsuarios;