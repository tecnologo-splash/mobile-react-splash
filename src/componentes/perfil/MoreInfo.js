import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFecha, getGenero } from './getDatos';
import { List, Portal } from 'react-native-paper';
import ListadoPublicaciones from '../publicaciones/ListadoPublicaciones';
import BotonOrden from '../muro/BotonOrden';


const MoreInfo = ({genero,biografia,fecha_nacimiento, publicaciones, onEnd, onRefresh}) => {
  return (
    <>
    <List.Section>
        <List.Accordion
        title="Mas Informacion">
            <List.Item title={`Fecha de Nacimiento: ${fecha_nacimiento? getFecha(fecha_nacimiento):''}`} />
            <View style={{flexDirection:'row'}}>
                <Text style={styles.genero}>Genero: </Text>
                {getGenero(genero)}
            </View>
        <List.Accordion title="Biografia:">
            <Text multiline style={styles.biografia}>{`${biografia ? biografia : '-'}`}</Text>
        </List.Accordion>
        </List.Accordion>
        <List.Accordion title="Publicaciones:">
          <ListadoPublicaciones publicaciones = {publicaciones} onEnd={() =>onEnd()} onRefresh={() =>onRefresh()}/>
        </List.Accordion>
  </List.Section>
  <Portal.Host style={{flex: 1}}>
    <BotonOrden />
  </Portal.Host>
  </>
  );
}

const styles = StyleSheet.create({
    genero:{
      marginLeft: 15,
      fontSize: 16,
      marginTop:2,
      marginRight:5
    },
    biografia:{
      margin: 10
    }
  })

export default MoreInfo;