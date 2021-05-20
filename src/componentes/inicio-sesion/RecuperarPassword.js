import React, {useContext} from 'react';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const RecuperarPassword = () => {
    const {state:{recuperar, usuario}, cambiarValor, recuperarPassword} = useContext(InicioSesionContext);
  return (
    <Portal>
        <Dialog visible={recuperar} onDismiss={()=>cambiarValor({variable: 'recuperar', valor: !recuperar})}>
            <Dialog.Title>Ingrese el correo electronico de su cuenta</Dialog.Title>
            <Dialog.Content>
            <TextInput
                    label="Email"
                    placeholder="ejemplo@ejemplo.com"
                    value={usuario}
                    onChangeText={text => cambiarValor({variable: 'usuario', valor: text})}
                    left={
                        <TextInput.Icon name="email"/>
                    }
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={()=>cambiarValor({variable: 'recuperar', valor: !recuperar})}>Volver</Button>
                <Button onPress={()=>recuperarPassword(usuario)}>Enviar</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
  );
}

export default RecuperarPassword;