import React, {useContext, useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {Context as ConversacionContext} from '../context/ConversacionContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoConversaciones from '../componentes/conversaciones/ListadoConversaciones'

const Conversaciones = ({navigation}) => {
  
  const [page, setPage] = useState(0);
  const {state:{conversacionesUsuario}, listarConversacionesUsuario} = useContext(ConversacionContext);

  useEffect(()=>{
    listarConversaciones(0);
  }, [navigation]);

  const listarConversaciones = async (pagina) =>{
    await listarConversacionesUsuario({page: pagina});
    setPage(pagina+1);
  }

  return (
    <View style={{ paddingBottom: 160}}>
      <NavBar/>
      <Button
          style={styles.button}
          mode="contained"
          onPress={()=>navigation.navigate('NuevaConversacion')}> 
            Nueva conversacion
      </Button>
      <ListadoConversaciones conversaciones={conversacionesUsuario} onEnd={()=>listarConversaciones(page)}/> 
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