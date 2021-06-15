import React, {useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import {Context as ConversacionContext} from '../context/ConversacionContext';
import ListadoMensajesConversacion from '../componentes/conversaciones/ListadoMensajesConversacion'
import NuevoMensaje from './NuevoMensaje'

const MensajesConversacion = ({route, navigation}) => {
  
  const {chat_id} = route.params;
  
  const {state:{mensajesConversacion}, listarMensajesConversacion} = useContext(ConversacionContext);
  
  useEffect(()=>{
    listarMensajes();
  }, [mensajesConversacion]);

  const listarMensajes = async () =>{
    await listarMensajesConversacion(chat_id);
  }

  return (
    <View>
      <Text>Chat: {chat_id}</Text>
      <NuevoMensaje chat_id={chat_id}/>
      <ListadoMensajesConversacion mensajes={mensajesConversacion}/>
    </View>
  );
}

export {MensajesConversacion};