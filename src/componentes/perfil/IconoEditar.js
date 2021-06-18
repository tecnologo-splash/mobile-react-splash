import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';

const IconoEditar = () => {

  const navigation = useNavigation();
  
  return <Portal.Host> 
      <Portal>
        <FAB
            style={styles.fab}
            large
            icon="account-edit"
            onPress={() => navigation.navigate("EditarPerfil")}
        />
      </Portal>
  </Portal.Host>;
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      marginBottom:10,
      right: 0,
      bottom: 0,
      alignSelf:'flex-end',
      backgroundColor:'#6d31bf'
    }
  })

export default IconoEditar;