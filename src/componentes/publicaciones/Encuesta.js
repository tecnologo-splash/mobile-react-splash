import React, {useContext, useState} from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Text } from 'react-native';
import { colores } from '../../config/colores';
import { Context as PublicacionContext} from '../../context/PublicacionContext';
import { Context as PerfilContext} from '../../context/PerfilContext';

const Encuesta = ({encuesta, publicacionId, usuarioId}) => {
  console.log("encuesta:", encuesta);
    const { votar } = useContext(PublicacionContext);
    const {state:{currentUser}} = useContext(PerfilContext);
    const [chequeado, setChequeado] = useState(encuesta.opcion_id_votada?encuesta.opcion_id_votada:-1);
    const fechaCierre = new Date(encuesta.fecha_cierre);
    const fechaActual = new Date(Date.now());

    const encuestaVigente=()=>{
      return fechaActual<fechaCierre?true:false;
    }

    const deshabilitada = ()=>{
      if((!encuestaVigente() || encuesta.opcion_id_votada!=null) || (currentUser.id === usuarioId || chequeado != -1)){
        return true;
      }
      return false;
    }

    const chequear = (opcionId)=>{
      votar({ opcionId, publicacionId });
      setChequeado(opcionId);
    }

  return (<View>
      {encuesta.opciones.map(opcion=>(
        <View style={{flexDirection:'row', margin:15}}>
          <Checkbox
          color={colores.appDefault}
          uncheckedColor={colores.gris}
          status={chequeado===opcion.id ? 'checked' : 'unchecked'}
          disabled={deshabilitada()}
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