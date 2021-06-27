import React, {useContext, useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {Context as ConversacionContext} from '../context/ConversacionContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoConversaciones from '../componentes/conversaciones/ListadoConversaciones'
import RNPusherPushNotifications from "react-native-pusher-beams-push-notifications";

const Conversaciones = ({navigation}) => {
  
  const [page, setPage] = useState(0);
  const {state:{conversacionesUsuario}, listarConversacionesUsuario} = useContext(ConversacionContext);

  const interests = [
    "debug-test",
  ];
  
  const init = () => {
    RNPusherPushNotifications.setInstanceId('PUSHER_BEAMS_INSTANCE_ID');
  
    // Init interests after registration
    RNPusherPushNotifications.on('registered', () => {
       subscribe(interests);
    });
  
    RNPusherPushNotifications.on("notification", handleNotification);
  };
  
  useEffect(()=>{
    listarConversaciones(0);
    init();
    console.log('Paso');
  }, []);

  const listarConversaciones = async (pagina) =>{
    await listarConversacionesUsuario({page: pagina});
    setPage(pagina+1);
  }

  return (
    <View style={{ paddingBottom: 160}}>
      <NavBar buscador={false} tituloNavBar={'Conversaciones'}/>
      <Button
          style={styles.button}
          mode="contained"
          onPress={()=>navigation.navigate('NuevaConversacion')}> 
            Nueva conversacion
      </Button>
      <ListadoConversaciones conversaciones={conversacionesUsuario} onEnd={()=>listarConversaciones(page)} onStart={()=>listarConversaciones(0)} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
      margin: 10, 
      borderWidth:0
  },
});

export {Conversaciones};