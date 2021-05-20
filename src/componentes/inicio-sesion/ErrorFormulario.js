import React, {useContext} from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const ErrorFormulario = () => {
  const {state:{error},cambiarValor} = useContext(InicioSesionContext);

  return (
    <Portal>
        <Dialog visible={error?true:false} onDismiss={()=>cambiarValor({variable: 'error', valor: null})}>
            <Dialog.Title>Error al inicio de sesion</Dialog.Title>
            <Dialog.Content>
                <Paragraph>Usuario y/o Password incorrecto</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={()=>cambiarValor({variable: 'error', valor: null})}>Volver</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
  );
}

export default ErrorFormulario;