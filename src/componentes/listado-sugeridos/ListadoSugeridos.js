import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { FlatList} from 'react-native-bidirectional-infinite-scroll';
import {Avatar, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { baseUriMultimedia } from '../../config/configs';
import { MaterialIcons } from '@expo/vector-icons';

const ListadoSugeridos = ({sugeridos, onEnd, onStart}) => {
  const navigation = useNavigation();

  return (
      <View style={styles.horizontalView}>
        <TouchableOpacity onPress={()=>onStart()}>
          <View style={styles.boton}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
          </View>
        </TouchableOpacity>
        {sugeridos.map((item,index)=>(
          <TouchableOpacity key={item.usuario_id.toString()} onPress={()=>navigation.navigate('PerfilExterno', {usuarioId: item.usuario_id, lo_sigo: false})} style={{margin: 5}}>
            <ListItem style={styles.sugeridosListItem}>
              
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
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={()=>onEnd()}>
          <View style={styles.boton}>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
          </View>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
  },
  sugeridosListItem:{
    width: 100,
  },
  boton:{
    width: 20,
    height: 170,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ListadoSugeridos;