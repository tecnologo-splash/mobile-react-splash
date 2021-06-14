import React, {useContext, useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {Context as ConversacionContext} from '../context/ConversacionContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoConversaciones from '../componentes/conversaciones/ListadoConversaciones'

const Conversaciones = ({navigation}) => {
  
  const {state:{conversacionesUsuario}, listarConversacionesUsuario} = useContext(ConversacionContext);

  useEffect(()=>{
    listarConversaciones();
  }, []);

  const listarConversaciones = async () =>{
    await listarConversacionesUsuario();
  }

  return (
    <View>
      <NavBar/>
      <Text>Conversaciones</Text>
        <ListadoConversaciones conversaciones={conversacionesUsuario}/> 
        <Button
            style={styles.button}
            mode="contained"
            onPress={()=>navigation.navigate('NuevaConversacion')}> 
              Nueva conversacion
        </Button>
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