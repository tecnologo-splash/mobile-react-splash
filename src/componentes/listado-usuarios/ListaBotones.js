import React, {useContext, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { filtroListadoUsuarios } from '../../config/filtros';
import {Context as ListarUsuariosContext} from '../../context/ListarUsuariosContext';

const ListaBotones = () => {
    const{state:{filtro},cambiarValor}= useContext(ListarUsuariosContext);
  return (
  <View style={styles.view}>
        <Button 
        mode={filtro == filtroListadoUsuarios._usuario? "contained":"outlined"} 
        onPress={() => cambiarValor({variable:"filtro",valor:filtroListadoUsuarios._usuario})}
        style={styles.button}
        >
            Usuario
        </Button>
        <Button 
        mode={filtro == filtroListadoUsuarios._nombre? "contained":"outlined"} 
        onPress={() => cambiarValor({variable:"filtro",valor:filtroListadoUsuarios._nombre})}
        style={styles.button}
        >
            Nombre
        </Button>
        <Button 
        mode={filtro == filtroListadoUsuarios._apellido? "contained":"outlined"} 
        onPress={() => cambiarValor({variable:"filtro",valor:filtroListadoUsuarios._apellido})}
        style={styles.button}
        >
            Apellido
        </Button>
        <Button 
        mode={filtro == filtroListadoUsuarios._correo? "contained":"outlined"} 
        onPress={() => cambiarValor({variable:"filtro",valor:filtroListadoUsuarios._correo})}
        style={styles.button}
        >
            Correo
        </Button>
  </View>
  );
}

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    button:{
        margin:5,
        borderWidth:0,
        borderRadius:20
    }
});
export default ListaBotones;