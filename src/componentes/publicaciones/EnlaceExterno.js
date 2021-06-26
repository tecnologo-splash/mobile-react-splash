import React from 'react';
import { StyleSheet, View, Image, Text, Linking, Alert, TouchableOpacity } from 'react-native';
import { maxDescEnlace, maxTituloEnlace } from '../../config/maximos';

const EnlaceExterno = ({enlace}) => {

    const abrirUrl = async ()=> {
      const supported = await Linking.canOpenURL(enlace.url);
      if(supported){
        await Linking.openURL(enlace.url);
      }else{
        Alert.alert("El enlace seleccionado no es valido");
      }
    }
  return (
    <TouchableOpacity onPress={()=>abrirUrl()}>
  <View style={styles.contenedor}>
      <Image  source={{uri:enlace.imagen_url}} style={styles.image}/>
      <View style={styles.cont}>
        <Text 
        numberOfLines={1} 
        style = {styles.title}>
          {enlace.titulo.length > maxTituloEnlace?`${enlace.titulo.slice(0, maxTituloEnlace)}...`:enlace.titulo}
        </Text>
        <Text 
        multiline 
        numberOfLines={8} 
        style = {styles.desc}>
          {enlace.descripcion.length > maxDescEnlace?`${enlace.descripcion.slice(0, maxDescEnlace)}...`:enlace.descripcion}
        </Text>
      </View>
  </View>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    margin:10,
    flexDirection:'row',
    alignItems: 'center'
  },
  title: {
      fontWeight:'bold',
      fontSize:15,
      flex:1,
      marginRight:10,
      textAlign: 'left'
  },
  cont:{
    margin:5
  },
  image: {
    height:70,
    width:70
  },
  desc:{
    margin:5,
    marginRight:20,
    width:250,
    flexShrink: 1,
    textAlign: 'left'
  }
})

export default EnlaceExterno;