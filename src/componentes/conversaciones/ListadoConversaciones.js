import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView , FlatList} from 'react-native';
//import { FlatList} from 'react-native-bidirectional-infinite-scroll';
import {Avatar, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { requestSizeListarCoversaciones } from "../../config/maximos";

const ListadoConversaciones = ({conversaciones, onEnd, onStart}) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={conversaciones}
      keyExtractor={(item, index) => index.toString()}
      refreshing={false}
      onRefresh={() => onStart()}
      onEndReachedThreshold={0.5}
      onEndReached = {()=>{if(conversaciones.length % requestSizeListarCoversaciones === 0){onEnd()}}}
      renderItem={({item})=>(
        <TouchableOpacity onPress={()=>navigation.navigate('MensajesConversacion', {chat_id: item.chat_id, nombre_chat: item.nombre_chat})} style={{margin: 5}}>
          <ListItem>
            
            <ListItem.Content style={{borderRadius: 20}}>
            <Avatar 
              rounded 
              source={require('../../../assets/perfilDefault.jpg')}
              size="large"
            >
            </Avatar>
            <ListItem.Title>{item.nombre_chat}</ListItem.Title>
            <ListItem.Title>{item.fecha_ultimo_mensaje}</ListItem.Title>
            <ListItem.Subtitle>{item.chat_grupal? "Grupal":"Personal"}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      )}
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