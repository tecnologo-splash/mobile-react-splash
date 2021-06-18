import React,{useContext} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { baseUriMultimedia } from '../../config/configs';
import {colores} from '../../config/colores';
import { FontAwesome } from '@expo/vector-icons';
import { Context as ComentariosContext} from '../../context/ComentariosContext';

const Comentario = ({comentario, publicacionId}) => {
    console.log("comentario en Comentario",comentario);
    const {eliminarComentario} = useContext(ComentariosContext);
    const usuario = comentario.usuario_comun;
  return (
    <View style={styles.container}>
      <Image source={{uri: `${baseUriMultimedia}${usuario.url_perfil}`}} style={styles.image}/>
      <View styles={styles.textContainer}>
        <View styles={styles.trashContainer}>
          <View style={styles.textContainer}>
              <Text style={{fontWeight:'bold'}}>{usuario.usuario}</Text>
              <Text numberOfLines={15}>{comentario.texto}</Text>
          </View>
          <FontAwesome name="trash" size={24} color="black" onPress={() =>eliminarComentario({publicacionId, comentarioId:comentario.id})}/>
        </View>
        <Text style = {styles.fecha}>{comentario.fecha_creado}</Text>
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
    },
    trashContainer: {
        flexDirection: "row",
    },
    fecha:{
      alignSelf:'flex-end',
      color: colores.gris,
      fontSize:13
    }
});
export default Comentario;