import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { colores } from '../../config/colores';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import {useNavigation} from '@react-navigation/native';
import { tipoOrdenPublicacion } from '../../config/configs';

const MenuTooltip = () => {
    const {cerrarSesion} = useContext(InicioSesionContext);
    const navigation = useNavigation();
    const {cambiarValor} = useContext(PublicacionContext);

    const cerrar = ()=>{
        cerrarSesion()
        navigation.navigate('InicioSesion');
    }

    const ordenar = (tipo)=>{  
        cambiarValor({variable: "tipoOrden",valor: tipo});
    }
  return (
      <View>
          {tipoOrdenPublicacion.map(tipo=>(
              <Text style={styles.text} onPress={()=>ordenar(tipo)}>Ordenar por {tipo.tipo}</Text>
          ))
          }
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