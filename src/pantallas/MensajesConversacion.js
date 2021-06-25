import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Context as ConversacionContext} from '../context/ConversacionContext';
import ListadoMensajesConversacion from '../componentes/conversaciones/ListadoMensajesConversacion';
import NuevoMensaje from './NuevoMensaje';

const MensajesConversacion = ({route, navigation}) => {
  
  const {chat_id, nombre_chat} = route.params;

  const navigation2 = useNavigation();
  const [page, setPage] = useState(0);
  const {state:{mensajesConversacion}, listarMensajesConversacion} = useContext(ConversacionContext);
  
  useEffect(()=>{
    navigation2.setOptions({ title: 
    <View style={styles.viewHorizontal}>
      <Image 
        style={styles.image} 
        source={require('../../assets/perfilDefault.jpg')
        }
      />
      <Text style={styles.text}>{nombre_chat}</Text>
    </View>})
    listarMensajes(0)
  }, []);

  const listarMensajes = async (pagina) =>{
    console.log('listarMensaje')
    await listarMensajesConversacion(chat_id, {page: pagina});
    setPage(pagina+1);
  }

  return (
    <View style={{ paddingBottom: 160}}>
      <Text>Chat: {chat_id}</Text>
      <ListadoMensajesConversacion mensajes={mensajesConversacion} onEnd={()=>listarMensajes(page)} onStart={()=>listarMensajes(0)}/>
      <NuevoMensaje chat_id={chat_id} />
    </View>
  );
}

const styles = StyleSheet.create({
  image:{
    height: 35, 
    width: 35, 
    borderRadius: 50,
    borderWidth: 2,
    borderColor:'#fff',
    marginLeft: 20,
  },
  viewHorizontal:{
    flex: 1, 
    flexDirection: 'row'
  },
  text:{
    color: '#fff',
    fontSize: 20,
    height:35,
    marginLeft: 15,
    flex: 1,
  },
});
export {MensajesConversacion};