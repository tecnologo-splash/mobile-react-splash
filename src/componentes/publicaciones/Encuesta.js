import React, {useContext, useState} from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Text } from 'react-native';
import { colores } from '../../config/colores';
import { Context as PublicacionContext} from '../../context/PublicacionContext';

const Encuesta = ({encuesta, publicacionId}) => {
    const { votar } = useContext(PublicacionContext);
    const fechaCierre = new Date(encuesta.fecha_cierre);
    const fechaActual = Date.now();
    const encuestaVigente=()=>{
      return fechaActual<fechaCierre;
    }

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
          disabled={encuestaVigente()&&encuesta.id_votada==null?false:true}
          onPress={() => chequear(opcion.id)}/>
          <Text style={{margin: 8}}>{opcion.texto} ({opcion.cantidad_votos})</Text>
        </View>
      ))}
      {encuestaVigente()?
        null:
        <Text style={{marginLeft:15,color:colores.gris}}>La encuesta ha caducado</Text>
      }
  </View>);
}

export default Encuesta;