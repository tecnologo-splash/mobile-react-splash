import React from 'react';
import {StyleSheet, Image, View } from 'react-native';
import UsuarioContra from './UsuarioContra';

const FormularioInicioSesion = () => {
    
  return (
    <View style={styles.main}>
        <View style={styles.main2}>
            <Image source={require("../../../assets/logo_dark.png")} style={{height: 120, width: 360, alignSelf: 'center'}}/>
            <UsuarioContra/>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    main2:{
        flex:1,
        flexDirection:'column'
    },
    main:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        marginLeft: 5,
        marginRight:5
    }
});

export default FormularioInicioSesion;