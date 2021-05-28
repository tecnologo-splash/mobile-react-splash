import React, {useContext} from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const ErrorFormulario = () => {
  const {state:{error:{titulo, cuerpo}},borrarError} = useContext(InicioSesionContext);

  return (
    <Portal>
        <Dialog visible={titulo?true:false} onDismiss={()=>borrarError()}>
            <Dialog.Title>{titulo}</Dialog.Title>
            <Dialog.Content>
                <Paragraph>{cuerpo}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={()=>borrarError()}>Volver</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
  );
}

export default ErrorFormulario;