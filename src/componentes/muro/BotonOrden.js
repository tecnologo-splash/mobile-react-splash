import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { ordenPublicacion } from '../../config/configs';
import {Context as PublicacionContext} from '../../context/PublicacionContext';

const BotonOrden = () => {
  const {state:{orden}, cambiarValor}=useContext(PublicacionContext);

  const cambiarOrden = (ordenSeleccionada)=> {
      cambiarValor({variable: "orden", valor:ordenSeleccionada})
  }
  return <Portal.Host> 
      <Portal>
          {orden == ordenPublicacion._asc?
            <FAB
            style={styles.fab}
            large
            icon="arrow-down"
            onPress={() => cambiarOrden(ordenPublicacion._desc)}
        />:
        <FAB
            style={styles.fab}
            large
            icon="arrow-up"
            onPress={() => cambiarOrden(ordenPublicacion._asc)}
        />
          }
        
      </Portal>
  </Portal.Host>;
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      alignSelf:'flex-end',
      backgroundColor:'#6d31bf'
    }
  })

export default BotonOrden;