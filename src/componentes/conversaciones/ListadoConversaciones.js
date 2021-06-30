import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView , FlatList} from 'react-native';
//import { FlatList} from 'react-native-bidirectional-infinite-scroll';
import {Avatar, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { requestSizeListarCoversaciones } from "../../config/maximos";
import { baseUriMultimedia } from '../../config/configs';

const ListadoConversaciones = ({conversaciones, onEnd, onStart}) => {

  const navigation = useNavigation();

  const renderItem = useCallback(({item})=>
    <TouchableOpacity onPress={()=>navigation.navigate('MensajesConversacion', {chat_id: item.chat_id, nombre_chat: item.nombre_chat, url_perfil: item.url_perfil})} style={{margin: 5}}>
      <ListItem>
        <Avatar 
          rounded 
          source={item.url_perfil ? { uri: `${baseUriMultimedia}${item.url_perfil}` } : require('../../../assets/perfilDefault.jpg')}
          size="large"
        />
        <ListItem.Content style={{borderRadius: 20}}>
          <ListItem.Title>{item.nombre_chat}</ListItem.Title>
          <ListItem.Subtitle>{item.fecha_ultimo_mensaje}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.chat_grupal? "Grupal":"Personal"}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>, []
  );

  const keyExtractor = useCallback((item) => item.chat_id, []);

  return (
    <FlatList
      data={conversaciones}
      keyExtractor={keyExtractor}
      refreshing={false}
      onRefresh={() => onStart()}
      onEndReachedThreshold={2}
      onEndReached = {()=>{if(conversaciones.length % requestSizeListarCoversaciones === 0){onEnd()}}}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'600',
    fontSize:15
  }
});

export default ListadoConversaciones;