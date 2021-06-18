import React,{useContext} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { baseUriMultimedia } from '../../config/configs';
import {colores} from '../../config/colores';
import { FontAwesome } from '@expo/vector-icons';
import { Context as ComentariosContext} from '../../context/ComentariosContext';
import {Context as PerfilContext} from '../../context/PerfilContext';
import Respuesta from './Respuesta';

const Comentario = ({comentario, publicacionId}) => {
    const {state:{comentario_a_responder},eliminarComentario, setComentarioAResponder} = useContext(ComentariosContext);
    const {state:{currentUser}} = useContext(PerfilContext);
    const usuario = comentario.usuario_comun;
    console.log("comentario_a_responder", comentario_a_responder);
    const aResponder = () => {
      if (comentario_a_responder.id!= comentario.id){
        setComentarioAResponder({id:comentario.id, usuario:usuario.usuario});
      }else{
        setComentarioAResponder({id:-1,usuario:""});
      }
    }
    const colorTouchable = ()=>{
      if (comentario_a_responder.id === comentario.id){
        return {backgroundColor: colores.appDefault, flex:1, alignItems:'flex-start',flexDirection:'row'};
      }
      return {backgroundColor: colores.transparente, flex:1, alignItems:'flex-start', flexDirection:'row'};
    }
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>aResponder()} style={colorTouchable()}>
          <Image source={{uri: `${baseUriMultimedia}${usuario.url_perfil}`}} style={styles.image}/>
          <View styles={styles.contentContainer}>
            <View styles={styles.trashContainer}>
              <View style={styles.textContainer}>
                  <Text style={{fontWeight:'bold'}}>{usuario.usuario}</Text>
                  <Text numberOfLines={15}>{comentario.texto}</Text>
              </View>
              {comentario.usuario_comun.id === currentUser.id ?
              <FontAwesome name="trash" size={24} color="black" onPress={() =>eliminarComentario({publicacionId, comentarioId:comentario.id})}/>
                :null
              }
            </View>
            <Text style = {styles.fecha}>{comentario.fecha_creado}</Text>
          </View>
        </TouchableOpacity>
        
      </View>
      <View style={styles.respuestas}>
          {comentario.respuestas.map(respuesta=>(
            <Respuesta respuesta={respuesta}/>
          ))}
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
    contentContainer:{
      borderRadius:5,
      margin:5,
      flex:1,
      flexDirection:"row",
      backgroundColor:"#aea2bf",
      padding:10
    },
    trashContainer: {
        flexDirection: "row",
        flex:1
    },
    fecha:{
      alignSelf:'flex-end',
      color: colores.gris,
      fontSize:13
    },
    respuestas:{
      marginLeft:30
    }
});
export default Comentario;