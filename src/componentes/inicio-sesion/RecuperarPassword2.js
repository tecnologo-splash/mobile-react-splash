import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { colores } from '../../config/colores';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';
import Cargando from '../Cargando';

const RecuperarPassword2 = () => {
    const {state:{recuperar2, usuario, cargando, codigo, clave, clave2}, cambiarValor, recuperarPassword2} = useContext(InicioSesionContext);

    return (
        <Portal>
            <Dialog visible={recuperar2}>
                <Dialog.Title> Ingrese el codigo enviado a su correo</Dialog.Title>
                <Dialog.Content>
                <TextInput
                        label="Código"
                        placeholder="123456"
                        value={codigo}
                        style={styles.input}
                        onChangeText={text => cambiarValor({variable: 'codigo', valor: text})}
                    />
                <TextInput
                        label="Clave"
                        placeholder="Clave"
                        value={clave}
                        style={styles.input}
                        onChangeText={text => cambiarValor({variable: 'clave', valor: text})}
                    />
                <TextInput
                        label="Repetir clave"
                        placeholder="Repetir clave"
                        value={clave2}
                        onChangeText={text => cambiarValor({variable: 'clave2', valor: text})}
                    />
                <Cargando estaCargando={cargando} color={colores.appDefault} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>recuperarPassword2(usuario, codigo, clave, clave2)}>Enviar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
const styles = StyleSheet.create({
    input:{
        marginBottom:8
    }
});
export default RecuperarPassword2;