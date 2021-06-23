import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { colores } from '../../config/colores';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';
import {useNavigation} from '@react-navigation/native';

const MenuTooltip = () => {
    const {cerrarSesion} = useContext(InicioSesionContext);
    const navigation = useNavigation();

    const cerrar = ()=>{
        cerrarSesion()
        navigation.navigate('InicioSesion');
    }

  return (
      <View>
          <Text style={styles.text} onPress={()=>cerrar()}>Cerrar Sesion</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    text:{
        color:colores.blanco,
        margin:2
    }
})
export default MenuTooltip;