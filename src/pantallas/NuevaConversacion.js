import React, {useContext, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {Context as ConversacionContext} from '../context/ConversacionContext';
import {Context as ListarUsuariosContext} from '../context/ListarUsuariosContext';

const NuevaConversacion = () => {

    const {state:{usuario, to_usuario_id, mensaje, tipoMensajeEnum, usuariosParaConversar }, cambiarValor , crearConversacion, listarUsuariosParaConversar} = useContext(ConversacionContext);
    
    const enviar = () => {
        var formData = { to_usuario_id, mensaje, tipoMensajeEnum }
        crearConversacion(formData);
    }

    useEffect(()=>{
        listarUsuarios();
    },[usuario]);

    const listarUsuarios = async ()=>{
        await listarUsuariosParaConversar({filtro: "usuario", valor:usuario});
    }
    
    const selecUsuarioParaConversar = (id) => {
        cambiarValor({variable: 'to_usuario_id', valor: id})
        cambiarValor({variable: 'usuario', valor: ""})
    }

    const quitarUsuarioParaConversar = () => {
        cambiarValor({variable: 'to_usuario_id', valor: ''})
        cambiarValor({variable: 'usuario', valor: ''})
    }
    
    return (
        <View style={styles.body}>
            <Text>Nueva conversación</Text>
                <Text onPress={()=>quitarUsuarioParaConversar()}>{to_usuario_id}</Text>
                {to_usuario_id === ''? 
                    <TextInput
                        label={"Usuario"}
                        value={usuario}
                        onChangeText={text => cambiarValor({variable: 'usuario', valor: text})}
                    />
                    :
                    null
                }
                {usuario != ''? 
                    <FlatList
                        data={usuariosParaConversar}
                        keyExtractor={item => item.id}
                        renderItem={({item})=>( <Text onPress={()=>selecUsuarioParaConversar(item.id)}>{item.usuario}</Text>)}
                    />
                    :
                    null
                }
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