import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {Context as ListarUsuariosContext} from '../../context/ListarUsuariosContext';
import {useNavigation} from '@react-navigation/native';
import Cargando from '../Cargando';
import { colores } from '../../config/colores';

const ListadoSugeridos = ({sugeridos}) => {
  const{state:{cargando},seguirUsuarioSugerido,dejarDeSeguirUsuarioSugerido}= useContext(ListarUsuariosContext);
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={sugeridos}
        horizontal={true}
        keyExtractor={item => item.usuario}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('PerfilExterno', {usuario: item})}>
            <ListItem>
              
              <ListItem.Content>
              <Avatar 
                rounded 
                source={item.url_perfil ? { uri: item.url_perfil } : require('../../../assets/perfilDefault.jpg')}
                size="large"
              >
              </Avatar>
              <ListItem.Title>{item.nombre}</ListItem.Title>
              <ListItem.Title>{item.apellido}</ListItem.Title>
              <ListItem.Subtitle>{item.usuario}</ListItem.Subtitle>
              {/*item.lo_sigo ?
                  <Text style={{...styles.text, color: '#dd182f'}} onPress={()=>dejarDeSeguirUsuarioSugerido(item.id)}>Dejar de seguir</Text>
                  :
                  <Text style={{...styles.text, color: '#296fe8'}} onPress={()=>seguirUsuarioSugerido(item.id)}>Seguir</Text>
              */}
              </ListItem.Content>
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

export default ListadoSugeridos;