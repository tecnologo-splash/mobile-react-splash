import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import {filtroSeguidos} from '../filtros';
import {Context as PerfilContext} from '../../context/PerfilContext';
import { StyleSheet } from 'react-native';

const ListaFiltros = () => {
    const{state:{filtro},cambiarValor}= useContext(PerfilContext);
  return (
    <View style={styles.view}>
        <Button 
        mode={filtro == filtroSeguidos._usuario? "contained":"outlined"} 
        onPress={() => cambiarValor({variable:"filtro",valor: filtroSeguidos._usuario})}
        style={styles.button}
        >
            Usuario
        </Button>
        <Button 
        mode={filtro == filtroSeguidos._nombre_apellido? "contained":"outlined"} 
        onPress={() => cambiarValor({variable:"filtro",valor: filtroSeguidos._nombre_apellido})}
        style={styles.button}
        >
            Nombre/Apellido
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
        margin:7,
        borderWidth:0,
        borderRadius:20
    }
});

export default ListaFiltros;