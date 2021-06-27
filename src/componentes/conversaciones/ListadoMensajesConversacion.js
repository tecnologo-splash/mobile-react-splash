import React, { useContext, useEffect } from 'react';
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
  
  return (
    <FlatList
      data={mensajes}
      keyExtractor={(item, index) => index.toString()}
      refreshing={false}
      onRefresh={() => onStart()}
      onEndReachedThreshold={2}
      onEndReached = {()=>{if(mensajes.length % requestSizeListarMensajes === 0){onEnd()}}}
      inverted
      renderItem={({item})=>(
        <ListItem>
          <ListItem.Content style={{borderRadius: 20}}>
            {item.from_usuario_id === currentUser.id?
              <View style = {styles.horizontalPinkView}>
                <View>
                  <ListItem.Title>{item.mensaje}</ListItem.Title>
                  <ListItem.Title>{item.fecha_envio}</ListItem.Title>
                </View>
              </View>
              :
              <View style = {styles.horizontalBlueView}>
                <View>
                  <ListItem.Title>{item.mensaje}</ListItem.Title>
                  <ListItem.Title>{item.fecha_envio}</ListItem.Title>
                </View>
              </View>
            }
          </ListItem.Content>
        </ListItem>
      )}
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
    backgroundColor: 'lightpink',
    flexDirection: 'row',
    flex: 1
  },
  horizontalBlueView: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1
  }
});

export default ListadoMensajesConversacion;