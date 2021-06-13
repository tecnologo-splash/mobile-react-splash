import React, {useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {Context as ConversacionContext} from '../context/ConversacionContext';

const NuevaConversacion = () => {

    const {state:{to_usuario_id, mensaje, tipoMensajeEnum }, cambiarValor , crearConversacion} = useContext(ConversacionContext);
    
    const enviar = () => {
        var formData = { to_usuario_id, mensaje, tipoMensajeEnum }
        crearConversacion(formData);
    }

    return (
        <View style={styles.body}>
            <Text>Nueva conversación</Text>
                <TextInput
                    label={"Usuario"}
                    value={to_usuario_id}
                    onChangeText={text => cambiarValor({variable: 'to_usuario_id', valor: text})}
                />
                <TextInput
                    label={"Mensaje"}
                    value={mensaje}
                    onChangeText={text => cambiarValor({variable: 'mensaje', valor: text})}
                />
                <Button
                    style={styles.button}
                    onPress={()=>enviar()}
                    mode="contained"> 
                        Enviar mensaje
                </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        margin: 10, 
        borderWidth:0
    },
    body:{
      margin: 5
    },
    container:{
      margin: 10
    },
    horizontalView: {
        flexDirection: 'row',
    },
    button:{
      margin:5,
      borderWidth:0,
      borderRadius:20
    }
});

export {NuevaConversacion};