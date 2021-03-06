import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { colores } from '../../config/colores';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';
import {useNavigation} from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getCurrentInfo } from '../../servicios/infoService';

const MenuTooltip = () => {
    const {cerrarSesion} = useContext(InicioSesionContext);
    const navigation = useNavigation();
    const [id,setId] = useState(null);

    useEffect(()=>{
        getCurrentInfo().then( (response ) =>{
            setId(response.data.id)
        })
    },[])

    const cerrar = ()=>{
        cerrarSesion(id)
        navigation.navigate('InicioSesion');
    }

  return (
      <View style = {styles.container}>
          <FontAwesome name="sign-out" size={24} color={colores.blanco} onPress={()=>cerrar()}/>
      </View>
  );
}

const styles = StyleSheet.create({
    container:{
        margin:5
    }
})
export default MenuTooltip;