import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';

const IconoEditar = () => {
  return <Portal.Host> 
      <Portal>
        <FAB
            style={styles.fab}
            large
            icon="account-edit"
            onPress={() => console.log('Editar Perfil')}
        />
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

export default IconoEditar;