import React, {useContext, useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {Context as ConversacionContext} from '../context/ConversacionContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoConversaciones from '../componentes/conversaciones/ListadoConversaciones'
import Cargando from '../componentes/Cargando';
import NuevaConversacion from './NuevaConversacion';



const Conversaciones = ({navigation}) => {
  
  // const [pageConversaciones, setPageConversaciones] = useState(0);
  const {state:{conversacionesUsuario}, listarConversacionesUsuario} = useContext(ConversacionContext);

  useEffect(()=>{
    listarConversaciones(0);
  }, []);

  const listarConversaciones = async (pagina) =>{
    await listarConversacionesUsuario({page: pagina});
    setPageConversaciones(pagina+1);
  }

  return (
    <View>
      <NavBar/>
      <Text>Conversaciones</Text>
      {/* {conversacionesUsuario.lenght > 0 ?
        <View>
          <ListadoConversaciones conversaciones={conversacionesUsuario}/>
          <Button
            style={styles.button}
            mode="contained"> 
              Nueva conversacion
          </Button>
        </View>
        : */}
        <Button
            style={styles.button}
            mode="contained"
            onPress={()=>navigation.navigate('NuevaConversacion')}> 
              Nueva conversacion
        </Button>
        {/* <NuevaConversacion /> */}
      {/* } */}
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