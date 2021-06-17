import React, {useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import {Context as ConversacionContext} from '../context/ConversacionContext';
import ListadoMensajesConversacion from '../componentes/conversaciones/ListadoMensajesConversacion'
import NuevoMensaje from './NuevoMensaje'

const MensajesConversacion = ({route, navigation}) => {
  
  const {chat_id, nombre_chat} = route.params;
  
  const [page, setPage] = useState(0);
  const {state:{mensajesConversacion}, listarMensajesConversacion} = useContext(ConversacionContext);
  
  useEffect(()=>{
    listarMensajes(0);
  }, [mensajesConversacion]);

  const listarMensajes = async (pagina) =>{
    await listarMensajesConversacion(chat_id, {page: pagina});
    setPage(pagina+1);
  }

  return (
    <View>
      <Text>{nombre_chat}</Text>
      <Text>Chat: {chat_id}</Text>
      <NuevoMensaje chat_id={chat_id}/>
      <ListadoMensajesConversacion mensajes={mensajesConversacion} onEnd={()=>listarMensajes(page)}/>
    </View>
  );
}

export {MensajesConversacion};