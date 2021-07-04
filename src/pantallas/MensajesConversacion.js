import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Context as ConversacionContext} from '../context/ConversacionContext';
import {Context as PerfilContext} from '../context/PerfilContext';
import ListadoMensajesConversacion from '../componentes/conversaciones/ListadoMensajesConversacion';
import NuevoMensaje from './NuevoMensaje';
import Pusher from 'pusher-js/react-native';
import { baseUriMultimedia } from '../config/configs';


const MensajesConversacion = ({route, navigation}) => {
  
  const {chat_id, nombre_chat, url_perfil} = route.params;

  const navigation2 = useNavigation();
  const [page, setPage] = useState(0);
  const {state:{mensajesConversacion}, listarMensajesConversacion, appendMensajeConversacion} = useContext(ConversacionContext);
  const {state:{currentUser}} = useContext(PerfilContext);


  useEffect(()=>{

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
    });

    navigation2.setOptions({ title: 
      <View style={styles.viewHorizontal}>
        <Image 
          style={styles.image} 
          source={url_perfil ? { uri: `${baseUriMultimedia}${url_perfil}` } :require('../../assets/perfilDefault.jpg')
          }
        />
        <Text style={styles.text}>{nombre_chat}</Text>
      </View>
    })

    listarMensajes(0)
  }, [chat_id]);

  const listarMensajes = async (pagina) =>{
    await listarMensajesConversacion(chat_id, {page: pagina});
    setPage(pagina+1);
  }

  return (
    <View style={{alignItems:"flex-end", flexDirection:"row", flex:1}}>
      <View style={{ flex:1}}>
        <ListadoMensajesConversacion mensajes={mensajesConversacion} onEnd={()=>listarMensajes(page)} onStart={()=>listarMensajes(0)}/>
        <NuevoMensaje chat_id={chat_id} />
      </View>
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