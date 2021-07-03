import React, { useContext, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import { Context as ConversacionContext } from '../context/ConversacionContext';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { baseUriMultimedia } from '../config/configs';

const NuevaConversacion = () => {

    const {state:{usuario, to_usuario_id, to_usuario_nombre, mensaje, tipoMensajeEnum, usuariosParaConversar }, cambiarValor , crearConversacion, listarUsuariosParaConversar, verificaSiExisteConversacion} = useContext(ConversacionContext);
    
    const navigation = useNavigation();
    
    useEffect(()=>{
        listarUsuarios();
    },[usuario]);

    const mostrarAlerta = (titulo, descripcion) =>{
        Alert.alert(titulo, descripcion, [{ text: "OK"}]);
    }

    const listarUsuarios = async ()=>{
        await listarUsuariosParaConversar({filtro: "usuario", valor:usuario});
    }
    
    const selecUsuarioParaConversar = async (id, nombre, url_perfil) => {
        const response = await verificaSiExisteConversacion(id)
        if (response){
            cambiarValor({variable: 'to_usuario_id', valor: ''})
            cambiarValor({variable: 'to_usuario_nombre', valor: ''})
            cambiarValor({variable: 'usuario', valor: ''})
            navigation.navigate("MensajesConversacion", {chat_id: response.chat_id, nombre_chat: nombre, url_perfil: url_perfil})
        }else{
            cambiarValor({variable: 'to_usuario_id', valor: id})
            cambiarValor({variable: 'to_usuario_nombre', valor: nombre})
            cambiarValor({variable: 'usuario', valor: ''})
        }
    }

    const quitarUsuarioParaConversar = () => {
        cambiarValor({variable: 'to_usuario_id', valor: ''})
        cambiarValor({variable: 'to_usuario_nombre', valor: ''})
    }

    const enviar = async () => {
        if(to_usuario_id !== '' && mensaje !== ''){
            var formData = { to_usuario_id, mensaje, tipoMensajeEnum }
            crearConversacion(formData);
            const response = await verificaSiExisteConversacion(to_usuario_id)
            if (response){
                cambiarValor({variable: 'to_usuario_id', valor: ''})
                cambiarValor({variable: 'to_usuario_nombre', valor: ''})
                cambiarValor({variable: 'usuario', valor: ''})
                cambiarValor({variable: 'mensaje', valor: ''})
                navigation.navigate("MensajesConversacion", {chat_id: response.chat_id, nombre_chat: response.nombre_chat, url_perfil: response.url_perfil})
            }else{
                cambiarValor({variable: 'to_usuario_id', valor: id})
                cambiarValor({variable: 'to_usuario_nombre', valor: nombre})
                cambiarValor({variable: 'usuario', valor: ''})
                cambiarValor({variable: 'mensaje', valor: ''})
            }
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
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={()=>selecUsuarioParaConversar(item.id, item.usuario, item.url_perfil)}>
                            <View style={styles.horizontalView}>
                                <Image 
                                style={styles.image} 
                                source={item.url_perfil ? { uri: `${baseUriMultimedia}${item.url_perfil}` } :require('../../assets/perfilDefault.jpg')
                                }
                                />
                                <Text style={styles.text}>{item.usuario}</Text>
                            </View>
                        </TouchableOpacity>
                        // <Text onPress={()=>selecUsuarioParaConversar(item.id, item.usuario)}>{item.usuario}</Text>)}
                    )}
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
    image:{
        height: 35, 
        width: 35, 
        borderRadius: 50,
        borderWidth: 2,
        borderColor:'#fff',
        marginLeft: 20,
    },
    text:{
        fontSize: 20,
        height:35,
        marginLeft: 15,
        flex: 1,
    },
});

export {NuevaConversacion};