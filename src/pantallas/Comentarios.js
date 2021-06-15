import React, {useEffect} from 'react';
import { View } from 'react-native';
import {Context as ComentariosContext} from '../context/ComentariosContext';
import TextoComentario from '../componentes/comentarios/TextoComentario';


const Comentarios = ({route}) => {
  const {publicacionId} = route.params;
  console.log("publicacionId",publicacionId);
  return (
    <View>
      <TextoComentario publicacionId={publicacionId}/>
    </View>
  );
}

export {Comentarios};