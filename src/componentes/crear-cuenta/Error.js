import React, {useContext} from 'react';
import {Context as CrearCuentaContext} from '../../context/CrearCuentaContext';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const Error = () => {
    const {state:{error},cambiarValor} = useContext(CrearCuentaContext);
    if(error){
        return (
            <Portal>
                <Dialog visible={error?true:false} onDismiss={()=>cambiarValor({variable: 'error', valor: null})}>
                    <Dialog.Title>Error: {error.tipo}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{error.mensaje}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>cambiarValor({variable: 'error', valor: null})}>Volver</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
          );
    }
    return null;
  
}

export default Error;