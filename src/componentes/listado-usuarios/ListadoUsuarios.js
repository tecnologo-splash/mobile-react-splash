import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import ListaBotones from './ListaBotones';
import {Context as ListarUsuariosContext} from '../../context/ListarUsuariosContext';
import {useNavigation} from '@react-navigation/native';
import Cargando from '../Cargando';
import { colores } from '../../config/colores';

const ListadoUsuarios = ({usuarios}) => {
  const{state:{cargando},seguirUsuario,dejarDeSeguirUsuario}= useContext(ListarUsuariosContext);
  const navigation = useNavigation();
  return (
    <View>
      <ListaBotones/>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('PerfilExterno', {usuario: item})}>
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
          <Cargando estaCargando={cargando} color={colores.appDefault} />
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