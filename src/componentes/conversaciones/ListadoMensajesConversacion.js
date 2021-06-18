import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
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
      renderItem={({item})=>(
        <ListItem>
          <ListItem.Content style={{borderRadius: 20}}>
            {item.from_usuario_id === currentUser.id?
              <View style = {styles.horizontalPinkView}>
                <Avatar 
                  rounded 
                  source={require('../../../assets/perfilDefault.jpg')}
                  size="large"
                >
                </Avatar>
                <View>
                  <ListItem.Title>{item.fecha_envio}</ListItem.Title>
                  <ListItem.Title>{item.mensaje}</ListItem.Title>
                  <ListItem.Subtitle>{item.from_usuario_id}</ListItem.Subtitle>
                </View>
              </View>
              :
              <View style = {styles.horizontalBlueView}>
                <View>
                  <ListItem.Title>{item.fecha_envio}</ListItem.Title>
                  <ListItem.Title>{item.mensaje}</ListItem.Title>
                  <ListItem.Subtitle>{item.from_usuario_id}</ListItem.Subtitle>
                </View>
                <Avatar 
                  rounded 
                  source={require('../../../assets/perfilDefault.jpg')}
                  size="large"
                  containerStyle={{
                    alignSelf: "center"
                  }}
                >
                </Avatar>
              </View>
            }
          </ListItem.Content>
        </ListItem>
      
      )}
      refreshing={false}
      onRefresh={() => onStart()}
      onEndReachedThreshold={0.5}
      onEndReached = {()=>{
        if(mensajes.length % requestSizeListarMensajes === 0){
          onEnd();
        }
      }}
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