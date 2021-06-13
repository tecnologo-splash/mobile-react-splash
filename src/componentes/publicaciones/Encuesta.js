import React, {useContext, useState} from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Text } from 'react-native';
import { colores } from '../../config/colores';
import { Context as PublicacionContext} from '../../context/PublicacionContext';

const Encuesta = ({encuesta, publicacionId}) => {
    const { votar } = useContext(PublicacionContext);
    const chequear = (opcionId)=>{
      votar({ opcionId, publicacionId })
    }

  return (<View>
      {encuesta.opciones.map(opcion=>(
        <View style={{flexDirection:'row', margin:15}}>
          <Checkbox
          color={colores.appDefault}
          uncheckedColor={colores.gris}
          status={encuesta.id_votada? encuesta.opcion_id_votada===opcion.id ? 'checked' : 'unchecked':'unchecked'}
          disabled={encuesta.id_votada?false:true}
          onPress={() => chequear(opcion.id)}/>
          <Text style={{margin: 8}}>{opcion.texto} ({opcion.cantidad_votos})</Text>
        </View>
      ))}
  </View>);
}

export default Encuesta;