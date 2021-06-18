import React, {useContext, useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import {Context as ComentariosContext} from '../context/ComentariosContext';
import TextoComentario from '../componentes/comentarios/TextoComentario';
import Comentario from '../componentes/comentarios/Comentario';
import {Context as PublicacionContext} from '../context/PublicacionContext';

const Comentarios = ({route}) => {
  const {publicacionId} = route.params;
  const {state:{comentarios}} = useContext(ComentariosContext);
  const {actualizarComentariosPublicacion} = useContext(PublicacionContext);

  useEffect(()=>{
    console.log("actualizar comentarios en Comentarios.js",comentarios.length);
    actualizarComentariosPublicacion({publicacionId, comentarios})
  },[comentarios])

  return (
    <View>
      <ScrollView>
        {comentarios.map(comentario=>(
          <Comentario comentario={comentario} publicacionId={publicacionId}/>
        ))}
      </ScrollView>
      <TextoComentario publicacionId={publicacionId}/>
    </View>
  );
}

export {Comentarios};