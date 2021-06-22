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
  }, []);

  const listarMensajes = async (pagina) =>{
    console.log('listarMensaje')
    await listarMensajesConversacion(chat_id, {page: pagina});
    setPage(pagina+1);
  }

  return (
    <View style={{ paddingBottom: 160}}>
      <Text>{nombre_chat}</Text>
      <Text>Chat: {chat_id}</Text>
      <ListadoMensajesConversacion mensajes={mensajesConversacion} onEnd={()=>listarMensajes(page)} onStart={()=>listarMensajes(0)}/>
      <NuevoMensaje chat_id={chat_id} />
    </View>
  );
}

export {MensajesConversacion};