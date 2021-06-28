import React, { useContext, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import { Context as ConversacionContext } from '../context/ConversacionContext';
import { AntDesign } from '@expo/vector-icons';

const NuevaConversacion = () => {

    const {state:{usuario, to_usuario_id, to_usuario_nombre, mensaje, tipoMensajeEnum, usuariosParaConversar }, cambiarValor , crearConversacion, listarUsuariosParaConversar, verificaSiExisteConversacion} = useContext(ConversacionContext);
    
    useEffect(()=>{
        listarUsuarios();
    },[usuario]);

    const mostrarAlerta = (titulo, descripcion) =>{
        Alert.alert(titulo, descripcion, [{ text: "OK"}]);
    }

    const listarUsuarios = async ()=>{
        await listarUsuariosParaConversar({filtro: "usuario", valor:usuario});
    }
    
    const selecUsuarioParaConversar = (id, nombre) => {
        verificaSiExisteConversacion(id)
        cambiarValor({variable: 'to_usuario_id', valor: id})
        cambiarValor({variable: 'to_usuario_nombre', valor: nombre})
        cambiarValor({variable: 'usuario', valor: ''})
    }

    const quitarUsuarioParaConversar = () => {
        cambiarValor({variable: 'to_usuario_id', valor: ''})
        cambiarValor({variable: 'to_usuario_nombre', valor: ''})
    }

    const enviar = () => {
        if(to_usuario_id !== '' && mensaje !== ''){
            var formData = { to_usuario_id, mensaje, tipoMensajeEnum }
            crearConversacion(formData);
        }else{
            mostrarAlerta("Error", "Debe seleccionar un usuario y escribir un mensaje")
        }
    }
    
    return (
        <View style={styles.body}>
            {to_usuario_nombre === ''? 
                <TextInput
                    label={"Seleccione usuario"}
                    value={usuario}
                    onChangeText={text => cambiarValor({variable: 'usuario', valor: text})}
                />
                :
                <ListItem onPress={()=>quitarUsuarioParaConversar()}>
                    <ListItem.Content>
                        <View style={styles.usuarioSel}>
                            <ListItem.Title>
                                <Text>{to_usuario_nombre}</Text>
                                <AntDesign name="closecircleo" size={20} color="black" />
                            </ListItem.Title>
                        </View>
                    </ListItem.Content>
                </ListItem>    
            }
            {usuario != ''? 
                <FlatList
                    data={usuariosParaConversar}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>( <Text onPress={()=>selecUsuarioParaConversar(item.id, item.usuario)}>{item.usuario}</Text>)}
                />
                :
                null
            }
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
    },
    usuarioSel:{
        borderWidth:1,
        borderRadius:20,
        padding: 10,
        flexDirection: 'row',
    },
});

export {NuevaConversacion};