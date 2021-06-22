import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { FAB, Portal } from 'react-native-paper';
import { ordenPublicacion, tipoOrdenPublicacion } from '../../config/configs';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import MenuTooltip from './MenuTooltip';

const BotonOrden = () => {
  const {state:{orden}, cambiarValor}=useContext(PublicacionContext);
  const [abierto, setAbierto] = useState(false);
  const cambiarOrden = (ordenSeleccionada)=> {
      cambiarValor({variable: "orden", valor:ordenSeleccionada})
  }
  return (
    <Portal style={styles.portal}>
        <FAB.Group
            open={abierto}
            style={styles.container}
            fabStyle={styles.fab}
            icon={abierto ? 'arrow-down' : 'arrow-up'}
            actions={[
              {
                icon: orden === ordenPublicacion._asc? 'arrow-down': 'arrow-up',
                label: 'Orden',
                onPress: () => cambiarOrden(orden === ordenPublicacion._asc?ordenPublicacion._desc:ordenPublicacion._asc),
              },
              { label: 'Fecha', icon: 'calendar', onPress: ()=> cambiarValor({variable:"tipoOrden", valor: tipoOrdenPublicacion[0]}) },
              {
                icon: 'emoticon-neutral',
                label: 'Cant No me gusta',
                onPress: () => cambiarValor({variable:"tipoOrden", valor: tipoOrdenPublicacion[1]}),
              },
              {
                icon: 'emoticon-poop',
                label: 'Cant No me Interesa',
                onPress: () => cambiarValor({variable:"tipoOrden", valor: tipoOrdenPublicacion[2]}),
                small: false,
              },
              {
                icon: 'star-face',
                label: 'Cant Me divierte',
                onPress: () => cambiarValor({variable:"tipoOrden", valor: tipoOrdenPublicacion[3]}),
                small: false,
              },
              {
                icon: 'emoticon-angry',
                label: 'Cant Me enoja',
                onPress: () => cambiarValor({variable:"tipoOrden", valor: tipoOrdenPublicacion[4]}),
                small: false,
              },
              {
                icon: 'emoticon-happy',
                label: 'Cant Me gusta',
                onPress: () => cambiarValor({variable:"tipoOrden", valor: tipoOrdenPublicacion[5]}),
                small: false,
              },
            ]}
            onStateChange = {() => setAbierto(!abierto)}
            onPress={() => setAbierto(!abierto)}
          />
      </Portal>
  );
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      alignSelf:'flex-end',
      backgroundColor:'#6d31bf'
    },
    container:{
      paddingBottom: 150
    }
  })

export default BotonOrden;