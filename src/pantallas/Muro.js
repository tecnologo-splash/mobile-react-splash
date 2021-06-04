import React, {useContext, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import {Context as InicioSesionContext} from '../context/InicioSesionContext';
import {Context as ListarUsuariosContext} from '../context/ListarUsuariosContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoUsuarios from '../componentes/listado-usuarios/ListadoUsuarios';

const Muro = ({navigation}) => {
  const {cerrarSesion} = useContext(InicioSesionContext);
  const {state:{filtro,buscar,usuarios},listarUsuariosParaSeguir} = useContext(ListarUsuariosContext);

  const cerrar = ()=>{
    cerrarSesion()
    navigation.navigate('InicioSesion');
  }
  useEffect(()=>{
    navigation.navigate('Muro');
    listarUsuariosParaSeguir({filtro, valor:buscar});
  },[buscar, filtro])
  return (
    <View>
      <NavBar/>
      {buscar!='' ? 
        <ListadoUsuarios usuarios={usuarios}/>
        :
        <View>
          <Text>Muro</Text>
          <Button title="Cerrar Sesion" onPress={()=>cerrar()}/>
        </View>
      }
    </View>
  );
}

export {Muro};