import React, {useContext,useEffect} from 'react';
import { Text, View } from 'react-native';
import {Context as PerfilContext} from '../context/PerfilContext';

const Perfil = () => {

  const {state:{currentUser}, getInfo} = useContext(PerfilContext)

  useEffect(()=>{
    getInfo()
  },[])

  return (
    <View>
      <Text>Perfil</Text>
      <Text>{currentUser.nombre}</Text>
    </View>
  );
}

export {Perfil};