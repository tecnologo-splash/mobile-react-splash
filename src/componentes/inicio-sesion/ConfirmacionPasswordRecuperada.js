import React, {useContext} from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const ConfirmacionPasswordRecuperada = () => {
    const {state:{recuperado}, cambiarValor} = useContext(InicioSesionContext);
  return (
    <Portal>
    <Dialog visible={recuperado} onDismiss={()=>cambiarValor({variable: 'recuperado', valor: !recuperado})}>
        <Dialog.Title>Se ha enviado un correo a su casilla</Dialog.Title>
        <Dialog.Content>
            <Paragraph>Continúa con los pasos mencionados en el correo para recuperar la contraseña.</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={()=>cambiarValor({variable: 'recuperado', valor: !recuperado})}>Volver</Button>
        </Dialog.Actions>
    </Dialog>
</Portal>
  );
}

export default ConfirmacionPasswordRecuperada;