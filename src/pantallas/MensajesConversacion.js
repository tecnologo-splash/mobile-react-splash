import React, {useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Context as ConversacionContext} from '../context/ConversacionContext';
import {Context as PerfilContext} from '../context/PerfilContext';
import ListadoMensajesConversacion from '../componentes/conversaciones/ListadoMensajesConversacion';
import NuevoMensaje from './NuevoMensaje';
import Pusher from 'pusher-js/react-native';


const MensajesConversacion = ({route, navigation}) => {
  
  const {chat_id, nombre_chat} = route.params;

  const navigation2 = useNavigation();
  const [page, setPage] = useState(0);
  const {state:{mensajesConversacion}, listarMensajesConversacion, appendMensajeConversacion} = useContext(ConversacionContext);
  const {state:{currentUser}} = useContext(PerfilContext);


  useEffect(()=>{
    navigation2.setOptions({ title: `${nombre_chat}`})

    const pusher = new Pusher("1f2a6fe63e0652eb4139", {
      cluster: "us2",
    });
    var channel = pusher.subscribe(`chat-usuario-${currentUser.id}`);
    channel.bind(`nuevo-mensaje`, function(data) {
      
      if( data.chatId === chat_id){
        let mensaje = {
          fecha_envio: data.fechaDeEnvio,
          from_usuario_id: data.fromUsuarioId,
          mensaje: data.mensaje,
          tipo_mensaje: data.tipoMensaje,
          from_usuario_nombre_apellido: "Sin nombre"
        }

        appendMensajeConversacion(mensaje)
      }

      // {
      //   "chatId": "60d5546740c5c47856b0885a",
      //   "fromUsuarioId": 62,
      //   "mensaje": "Hola joquito",
      //   "tipoMensaje": "TEXTO",
      //   "fechaDeEnvio": "Jun 25, 2021, 8:04:13 PM"
      // }
      // alert();
    });


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

export {MensajesConversacion};