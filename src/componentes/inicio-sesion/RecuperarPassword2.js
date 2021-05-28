import React, {useContext, useState} from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Paragraph, Portal, TextInput } from 'react-native-paper';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';

const RecuperarPassword2 = () => {
    const {state:{recuperar2, usuario, codigo, clave, clave2}, cambiarValor, validarPassword, recuperarPassword2} = useContext(InicioSesionContext);
    const [errorMsg, setErrorMsq] = useState(false);

    const enviar = ()=>{
        var coinciden= validarPassword({clave, clave2});
        
        if(coinciden){
            setErrorMsq(false)
            recuperarPassword2(usuario, codigo, clave);
        }else{
            setErrorMsq(true)
        }
    }

    return (
        <Portal>
            <Dialog visible={recuperar2}>
                <Dialog.Title> Ingrese el codigo enviado a su correo</Dialog.Title>
                <Dialog.Content>
                    {errorMsg?
                    <Paragraph style={styles.paragraph}>Clave y confirmar no son iguales</Paragraph>
                    :null}
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
                    <Button onPress={()=>enviar()}>Enviar</Button>
                </Dialog.Actions>
                {/*<Error/>*/}
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    paragraph:{
        color: "red"
    },
});
export default RecuperarPassword2;