import React, {useContext, useEffect, useState} from 'react';
import { View, ScrollView } from 'react-native';
import {Context as ListarUsuariosContext} from '../context/ListarUsuariosContext';
import {Context as PublicacionContext} from '../context/PublicacionContext';

import NavBar from '../componentes/muro/NavBar';
import ListadoUsuarios from '../componentes/listado-usuarios/ListadoUsuarios';
import ListadoSugeridos from '../componentes/listado-sugeridos/ListadoSugeridos';
import ListadoPublicaciones from '../componentes/publicaciones/ListadoPublicaciones';
import Cargando from '../componentes/Cargando';
import { colores } from '../config/colores';
import { List } from 'react-native-paper';
import BotonOrden from '../componentes/muro/BotonOrden';
import {Context as PerfilContext} from '../context/PerfilContext';

const Muro = () => {

  const [page, setPage] = useState(0);
  const [pageSugeridos, setPageSugeridos] = useState(0);
  const[pagePublicaciones, setPagePublicaciones] = useState(0);
  const {state:{filtro,buscar,usuarios, cargando, sugeridos},listarUsuariosParaSeguir, listarUsuariosSugeridos} = useContext(ListarUsuariosContext);
  const {state:{publicaciones, orden, tipoOrden}, listarPublicacionesMuro} = useContext(PublicacionContext);
  const {state:{currentUser}}= useContext(PerfilContext);
  console.log("publicacion muro",publicaciones.length);

  useEffect(()=>{
    listarUsuarios(0);
    listarSugeridos(0);
    listarPublicaciones(0);
  },[buscar, filtro, orden, tipoOrden]);

  const listarUsuarios = async (pagina)=>{
    await listarUsuariosParaSeguir({filtro, valor:buscar, page: pagina, currentUserId: currentUser.id});
    setPage(pagina+1);
  }

  const listarSugeridos = async (pagina) =>{
    await listarUsuariosSugeridos({page: pagina});
    setPageSugeridos(pagina+1);
  }
  
  const listarPublicaciones = async (pagina) =>{
    await listarPublicacionesMuro({page: pagina, orden: orden, tipoOrden: tipoOrden});
    setPagePublicaciones(pagina+1);
  }

  return (
    <View style={{ paddingBottom: 160}}>
      <NavBar/>
      {buscar!='' ? 
        <ListadoUsuarios usuarios={usuarios} onEnd={()=>listarUsuarios(page)}/>
        :
        <View>
          <ScrollView  onScrollEndDrag={()=>listarPublicaciones(pagePublicaciones)}>
          <ListadoSugeridos sugeridos={sugeridos} onEnd={()=>listarSugeridos(pageSugeridos)}/>
          <ListadoPublicaciones 
          publicaciones = {publicaciones}
          onEnd={()=>listarPublicaciones(pagePublicaciones)} />
          </ScrollView>
          
          <Cargando estaCargando={cargando} color={colores.appDefault} />
        </View>
      }
      <BotonOrden/>

    </View>
  );
}

export {Muro};