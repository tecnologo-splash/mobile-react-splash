import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFecha, getGenero } from './getDatos';
import { List } from 'react-native-paper';
import ListadoPublicaciones from '../publicaciones/ListadoPublicaciones';


const MoreInfo = ({genero,biografia,fecha_nacimiento, publicaciones}) => {
  return (
    <List.Section>
        <List.Accordion
        title="Mas Informacion">
            <List.Item title={`Fecha de Nacimiento: ${fecha_nacimiento? getFecha(fecha_nacimiento):''}`} />
            <View style={{flexDirection:'row'}}>
                <Text style={styles.genero}>Genero: </Text>
                {getGenero(genero)}
            </View>
        <List.Accordion title="Biografia">
            <Text multiline style={styles.biografia}>{`${biografia ? biografia : '-'}`}</Text>
        </List.Accordion>
        </List.Accordion>
        <List.Accordion title="Publicaciones">
          <ListadoPublicaciones publicaciones = {publicaciones} />
        </List.Accordion>
  </List.Section>
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