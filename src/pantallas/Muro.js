import React, {useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import {Context as ListarUsuariosContext} from '../context/ListarUsuariosContext';
import {Context as PublicacionContext} from '../context/PublicacionContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoUsuarios from '../componentes/listado-usuarios/ListadoUsuarios';
import ListadoSugeridos from '../componentes/listado-sugeridos/ListadoSugeridos';
import ListadoPublicaciones from '../componentes/publicaciones/ListadoPublicaciones';

const Muro = () => {

  const [page, setPage] = useState(0);
  const {state:{filtro,buscar,usuarios, sugeridos},listarUsuariosParaSeguir, listarUsuariosSugeridos} = useContext(ListarUsuariosContext);
  const {state:{publicaciones}, listarPublicacionesMuro} = useContext(PublicacionContext);
  useEffect(()=>{
    listarUsuarios(0);
    listarSugeridos(0);
    listarPublicacionesMuro();
    setPage(0);
  },[buscar, filtro]);

  const listarUsuarios = (pagina)=>{
    listarUsuariosParaSeguir({filtro, valor:buscar, page: pagina});
    setPage(page+1);
  }

  const listarSugeridos = (pagina) =>{
    listarUsuariosSugeridos({page: pagina});
    setPage(page+1);
  }

  return (
    <View>
      <NavBar/>
      {buscar!='' ? 
        <ListadoUsuarios usuarios={usuarios} onEnd={()=>listarUsuarios(page)}/>
        :
        <View>
          <Text>Muro</Text>
          <ListadoSugeridos sugeridos={sugeridos} onEnd={()=>listarSugeridos(page)}/>
          <ListadoPublicaciones publicaciones = {publicaciones} />
        </View>
      }
    </View>
  );
}

export {Muro};