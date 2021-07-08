import React, {useContext, useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import {Context as ComentariosContext} from '../context/ComentariosContext';
import TextoComentario from '../componentes/comentarios/TextoComentario';
import Comentario from '../componentes/comentarios/Comentario';
import {Context as PublicacionContext} from '../context/PublicacionContext';
import CantReacciones from '../componentes/comentarios/CantReacciones';

const Comentarios = ({route}) => {
  const {publicacion} = route.params;
  const {state:{comentarios}} = useContext(ComentariosContext);
  const {actualizarComentariosPublicacion} = useContext(PublicacionContext);

  useEffect(()=>{
    console.log("actualizar comentarios en Comentarios.js",comentarios.length);
    actualizarComentariosPublicacion({publicacionId: publicacion.id, comentarios, usuarioCreadorId: publicacion.usuario_comun.id})
  },[comentarios])
  console.log("usuariocreadorid en comentarios",publicacion.usuario_comun.id);

  return (
    <View>
      <ScrollView>
        <CantReacciones cantReacciones={publicacion.resumen_reaccion}/>
        {comentarios.map(comentario=>(
          <Comentario comentario={comentario} publicacionId={publicacion.id} usuarioCreadorId={publicacion.usuario_comun.id}/>
        ))}
      </ScrollView>
      <TextoComentario publicacionId={publicacion.id}/>
    </View>
  );
}

export {Comentarios};