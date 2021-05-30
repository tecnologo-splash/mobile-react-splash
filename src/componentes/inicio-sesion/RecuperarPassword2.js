import React, {useContext} from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const RecuperarPassword2 = () => {
    const {state:{recuperar2, usuario, codigo, clave, clave2}, cambiarValor, recuperarPassword2} = useContext(InicioSesionContext);

    return (
        <Portal>
            <Dialog visible={recuperar2}>
                <Dialog.Title> Ingrese el codigo enviado a su correo</Dialog.Title>
                <Dialog.Content>
                <TextInput
                        label="Código"
                        placeholder="123456"
                        value={codigo}
                        onChangeText={text => cambiarValor({variable: 'codigo', valor: text})}
                    />
                <TextInput
                        label="Clave"
                        placeholder="Clave"
                        value={clave}
                        onChangeText={text => cambiarValor({variable: 'clave', valor: text})}
                    />
                <TextInput
                        label="Repetir clave"
                        placeholder="Repetir clave"
                        value={clave2}
                        onChangeText={text => cambiarValor({variable: 'clave2', valor: text})}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>recuperarPassword2(usuario, codigo, clave, clave2)}>Enviar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default RecuperarPassword2;