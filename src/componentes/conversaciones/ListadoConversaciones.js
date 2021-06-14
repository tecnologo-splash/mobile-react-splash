import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { FlatList} from 'react-native-bidirectional-infinite-scroll';
import {Avatar, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const ListadoConversaciones = ({conversaciones, onEnd}) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <FlatList
        data={conversaciones}
        keyExtractor={item => item.chat_id}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('MensajesConversacion', {chat_id: item.chat_id})} style={{margin: 5}}>
            <ListItem>
              
              <ListItem.Content style={{borderRadius: 20}}>
              <Avatar 
                rounded 
                source={require('../../../assets/perfilDefault.jpg')}
                size="large"
              >
              </Avatar>
              <ListItem.Title>{item.fecha_ultimo_mensaje}</ListItem.Title>
              <ListItem.Title>{item.nombre_chat}</ListItem.Title>
              <ListItem.Subtitle>{item.chat_grupal? "Grupal":"Personal"}</ListItem.Subtitle>
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

export default ListadoConversaciones;