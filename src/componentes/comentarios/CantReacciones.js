import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {tiposReacciones} from '../../config/configs'

const CantReacciones = ({cantReacciones}) => {
    console.log(cantReacciones);
    const getCantReacciones = (reaccion)=>{
        switch(reaccion.tipo){
            case "ME_GUSTA":
                return cantReacciones.cantidad_me_gusta;
            case "NO_ME_GUSTA":
                return cantReacciones.cantidad_no_me_gusta;
            case "ME_ENOJA":
                return cantReacciones.cantidad_me_enoja;
            case "ME_DIVIERTE":
                return cantReacciones.cantidad_me_divierte;
            case "NO_ME_INTERESA":
                return cantReacciones.cantidad_no_me_interesa;
            default:
                return null;
        }
    }
  return (
    <View style={styles.card}>
        {tiposReacciones.map((reaccion)=>(
            <View style={styles.card2}>
                <Image source={reaccion.icono} style={styles.image}/>
                <Text style={styles.text}>{getCantReacciones(reaccion)}</Text>
            </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
    image:{
        height: 20,
        width: 20
    },
    text:{
        marginLeft:5
    },
    touchable: {
        margin: 5,
        flexDirection: 'row'
    },
    card:{
        margin:5,
        alignItems:'center',
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    card2:{
        flexDirection:'row'
    }
})
export default CantReacciones;