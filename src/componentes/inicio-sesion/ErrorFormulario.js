import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const ErrorFormulario = () => {
  const {state:{error:{titulo, cuerpo, anterior, hayError}},volverError} = useContext(InicioSesionContext);

  return (
    <Portal>
        <Dialog visible={titulo?true:false} onDismiss={()=>volverError(anterior)}>
            <Dialog.Title>{titulo}</Dialog.Title>
            <Dialog.Content>
                <Paragraph style={hayError ? styles.error : styles.success}>{cuerpo}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={()=>volverError(anterior)}>Volver</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  error:{
      color: "red"
  },
  success:{
      color: "green"
  },
});

export default ErrorFormulario;