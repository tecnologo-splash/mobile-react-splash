import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { baseUriMultimedia } from '../../config/configs';

const Comentario = ({comentario}) => {
    console.log("comentario en Comentario",comentario);
    const usuario = comentario.usuario_comun;
  return (
    <View style={styles.container}>
      <Image source={{uri: `${baseUriMultimedia}${usuario.url_perfil}`}} style={styles.image}/>
      <View styles={styles.textContainer}>
        <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>{usuario.usuario}</Text>
            <Text numberOfLines={15}>{comentario.texto}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'stretch',
        margin: 10
    },
    image:{
        height:50,
        width:50,
        borderRadius:50,
        margin:5
    },
    textContainer:{
        borderRadius:5,
        margin:5,
        backgroundColor:"#aea2bf",
        padding:10
    }
});
export default Comentario;