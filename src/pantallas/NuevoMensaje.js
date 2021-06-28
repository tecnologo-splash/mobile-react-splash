import React, {useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {Context as ConversacionContext} from '../context/ConversacionContext';
import {Context as PerfilContext} from '../context/PerfilContext';

const NuevoMensaje = ({chat_id}) => {

    const {state:{ mensaje }, cambiarValor , crearMensaje } = useContext(ConversacionContext);
    
    //Esto es solo para saber mi id
    const {state:{currentUser}} = useContext(PerfilContext);
    //fin de esto es solo para saber mi id
    
    const enviar = () => {
        var formData = { chat_id, mensaje, tipo_mensaje: "TEXTO" }
        crearMensaje(formData, currentUser.id);
    }

    return (
        <View style={styles.body}>
            <TextInput
                label={"Escriba mensaje"}
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
    button:{
      margin:5,
      borderWidth:0,
      borderRadius:20
    }
});

export default NuevoMensaje;