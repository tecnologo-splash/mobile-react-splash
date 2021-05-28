import React, {useContext} from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const ConfirmacionPasswordRecuperada = () => {
    const {state:{recuperado}, cambiarValor} = useContext(InicioSesionContext);
  return (
    <Portal>
    <Dialog visible={recuperado} onDismiss={()=>cambiarValor({variable: 'recuperado', valor: !recuperado})}>
        <Dialog.Title>Su contraseña a sido a sido actualizada</Dialog.Title>
        <Dialog.Content>
            <Paragraph>Ya puede iniciar sesion con su nueva contraseña.</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={()=>cambiarValor({variable: 'recuperado', valor: !recuperado})}>Aceptar</Button>
        </Dialog.Actions>
    </Dialog>
</Portal>
  );
}

export default ConfirmacionPasswordRecuperada;