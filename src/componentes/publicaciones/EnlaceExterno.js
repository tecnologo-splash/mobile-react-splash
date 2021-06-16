import React from 'react';
import { StyleSheet, View, Image, Text, Linking, Alert, TouchableOpacity } from 'react-native';

const EnlaceExterno = ({enlace}) => {
    console.log(enlace);

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
        <Text multiline style = {styles.title}>{enlace.titulo}</Text>
        <Text multiline>{enlace.descripcion}</Text>
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
      fontWeight:'800',
      fontSize:15
  },
  cont:{
    margin:5
  },
  image: {
    height:70,
    width:70
  }
})

export default EnlaceExterno;