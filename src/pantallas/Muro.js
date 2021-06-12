import React, {useContext, useEffect, useState} from 'react';
import { View } from 'react-native';
import {Context as ListarUsuariosContext} from '../context/ListarUsuariosContext';
import {Context as PublicacionContext} from '../context/PublicacionContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoUsuarios from '../componentes/listado-usuarios/ListadoUsuarios';
import ListadoSugeridos from '../componentes/listado-sugeridos/ListadoSugeridos';
import ListadoPublicaciones from '../componentes/publicaciones/ListadoPublicaciones';
import Cargando from '../componentes/Cargando';
import { colores } from '../config/colores';
import { List } from 'react-native-paper';

const Muro = () => {

  const [page, setPage] = useState(0);
  const [pageSugeridos, setPageSugeridos] = useState(0);
  const[pagePublicaciones, setPagePublicaciones] = useState(0);
  const {state:{filtro,buscar,usuarios, cargando, sugeridos},listarUsuariosParaSeguir, listarUsuariosSugeridos} = useContext(ListarUsuariosContext);
  const {state:{publicaciones}, listarPublicacionesMuro} = useContext(PublicacionContext);
  console.log("publicacion muro",publicaciones.length);

  useEffect(()=>{
    listarUsuarios(0);
    listarSugeridos(0);
    listarPublicaciones(0);
  },[buscar, filtro]);

  const listarUsuarios = async (pagina)=>{
    await listarUsuariosParaSeguir({filtro, valor:buscar, page: pagina});
    setPage(pagina+1);
  }

  const listarSugeridos = async (pagina) =>{
    await listarUsuariosSugeridos({page: pagina});
    setPageSugeridos(pagina+1);
  }
  
  const listarPublicaciones = async (pagina) =>{
    await listarPublicacionesMuro({page: pagina});
    setPagePublicaciones(pagina+1);
  }

  return (
    <View>
      <NavBar/>
      {buscar!='' ? 
        <ListadoUsuarios usuarios={usuarios} onEnd={()=>listarUsuarios(page)}/>
        :
        <View>
          <ListadoSugeridos sugeridos={sugeridos} onEnd={()=>listarSugeridos(pageSugeridos)}/>
          <ListadoPublicaciones 
          publicaciones = {publicaciones}
          onEnd={()=>listarPublicaciones(pagePublicaciones)} />
          <Cargando estaCargando={cargando} color={colores.appDefault} />
        </View>
      }
    </View>
  );
}

export {Muro};