import React, { useContext, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements';
import { requestSizeListarMensajes } from "../../config/maximos";

//Esto es solo para saber mi id
import {Context as PerfilContext} from '../../context/PerfilContext';
//fin de esto es solo para saber mi id

const ListadoMensajesConversacion = ({mensajes, onEnd, onStart}) => {

  //Esto es solo para saber mi id
  const {state:{currentUser}} = useContext(PerfilContext);
  //fin de esto es solo para saber mi id
  
  const renderItem = useCallback(({item}) =>
    <ListItem>
      <ListItem.Content>
        {item.from_usuario_id === currentUser.id?
          <>
            <View style = {styles.arrowPinkView}/>
            <View style = {styles.horizontalPinkView}>
              <View>
                <ListItem.Title>{item.mensaje}</ListItem.Title>
                <ListItem.Subtitle>{item.fecha_envio}</ListItem.Subtitle>
              </View>
            </View>
          </>
          :
          <>
            <View style = {styles.arrowBlueView}/>
            <View style = {styles.horizontalBlueView}>
              <View>
                <ListItem.Title>{item.mensaje}</ListItem.Title>
                <ListItem.Subtitle>{item.fecha_envio}</ListItem.Subtitle>
              </View>
            </View>
          </>
        }
      </ListItem.Content>
    </ListItem>, []
  );

  const keyExtractor = useCallback((item)=> item.fecha_envio.toString());

  return (
    <FlatList
      data={mensajes}
      keyExtractor={keyExtractor}
      refreshing={false}
      onRefresh={() => onStart()}
      onEndReachedThreshold={2}
      onEndReached = {()=>{if(mensajes.length % requestSizeListarMensajes === 0){onEnd()}}}
      inverted
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'600',
    fontSize:15
  },  
  horizontalView: {
    flexDirection: 'row',
    flex: 1
  },
  horizontalPinkView: {
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'lightpink',
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  },
  arrowPinkView: {
    position: 'absolute',
    left: -16,
    alignSelf: 'baseline',
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 26,
    borderRightColor: 'red',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent',
  },
  horizontalBlueView: {
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1,
    padding: 10,
  },
  arrowBlueView: {
    position: 'absolute',
    right: -16,
    alignSelf: 'baseline',
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderLeftWidth: 26,
    borderLeftColor: 'blue',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent',
  },
});

export default ListadoMensajesConversacion;