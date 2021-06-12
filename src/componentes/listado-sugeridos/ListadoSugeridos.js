import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { FlatList} from 'react-native-bidirectional-infinite-scroll';
import {Avatar, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { baseUriMultimedia } from '../../config/configs';

const ListadoSugeridos = ({sugeridos, onEnd}) => {
  const navigation = useNavigation();
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <FlatList
        data={sugeridos}
        horizontal={true}
        keyExtractor={item => item.usuario}
        onEndReached={()=>onEnd()}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('PerfilExterno', {usuario: item})} style={{margin: 5}}>
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
          </TouchableOpacity>
          )}
          />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'600',
    fontSize:15
  }
});

export default ListadoSugeridos;