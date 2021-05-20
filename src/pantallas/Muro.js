import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';
import {Context as InicioSesionContext} from '../context/InicioSesionContext'
import { useNavigation } from '@react-navigation/native';

const Muro = ({navigation}) => {
  const {cerrarSesion} = useContext(InicioSesionContext);
  //const navigation = useNavigation();

  const cerrar = ()=>{
    cerrarSesion()
    navigation.navigate('InicioSesion');
  }
  return (
    <View>
      <Text>Muro</Text>
      <Button title="Cerrar Sesion" onPress={()=>cerrar()}/>
    </View>
  );
}

export {Muro};