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
import { List, Portal } from 'react-native-paper';
import BotonOrden from '../componentes/muro/BotonOrden';
import {Context as PerfilContext} from '../context/PerfilContext';
import {Context as ComentariosContext} from '../context/ComentariosContext';
import {Context as InicioSesionContext} from '../context/InicioSesionContext';


import {init} from '../../initPusher';

const Muro = ({navigation}) => {

  const [page, setPage] = useState(0);
  const [pageSugeridos, setPageSugeridos] = useState(0);
  const[pagePublicaciones, setPagePublicaciones] = useState(0);
  const {cerrarSesion} = useContext(InicioSesionContext);
  const {state:{filtro,buscar,usuarios, cargando, sugeridos},listarUsuariosParaSeguir, listarUsuariosSugeridos} = useContext(ListarUsuariosContext);
  const {state:{publicaciones, orden, tipoOrden, redireccionar}, listarPublicacionesMuro} = useContext(PublicacionContext);
  const {state:{comentarios}} = useContext(ComentariosContext);
  const {state:{currentUser}}= useContext(PerfilContext);


  const interest = `users-${currentUser.id}`
  useEffect(()=>{

    //init(interest); ///////// ES EL PUSHER

    setTodoaCero();
    console.log("EJECUTO USE EFFECT", redireccionar);
    if(redireccionar == true){
      console.log("EJECUTO USE EFFECT EN EL IF");
      cerrarSesion();
      navigation.navigate('InicioSesion');
    }
    
  },[buscar, filtro, orden, tipoOrden, currentUser, comentarios, redireccionar]);

  const setTodoaCero = ()=> {
    listarUsuarios(0);
    listarSugeridos(0);
    listarPublicaciones(0);
  }
  const listarUsuarios = async (pagina)=>{
    await listarUsuariosParaSeguir({filtro, valor:buscar, page: pagina, currentUserId: currentUser.id});
    setPage(pagina+1);
  }

  const listarSugeridos = async (pagina) =>{
    await listarUsuariosSugeridos({page: pagina, currentUser: currentUser.usuario});
    setPageSugeridos(pagina+1);
  }
  
  const listarPublicaciones = async (pagina) =>{
    await listarPublicacionesMuro({page: pagina, orden: orden, tipoOrden: tipoOrden});
    setPagePublicaciones(pagina+1);
  }

  return (
    <View style={{ paddingBottom: 160}}>
      <NavBar buscador={true} tituloNavBar={''}/>
      {buscar!='' ? 
        <ListadoUsuarios usuarios={usuarios} onEnd={()=>listarUsuarios(page)}/>
        :
        <View>
          <ScrollView  onMomentumScrollEnd={()=>listarPublicaciones(pagePublicaciones)} showsVerticalScrollIndicator={false}>
          <ListadoSugeridos sugeridos={sugeridos} onEnd={()=>listarSugeridos(pageSugeridos)}/>
          <ListadoPublicaciones 
          publicaciones = {publicaciones}
          onEnd={()=>listarPublicaciones(pagePublicaciones)} />
          </ScrollView>
          
          <Cargando estaCargando={cargando} color={colores.appDefault} />
          <Portal.Host>
            <BotonOrden/>
          </Portal.Host>
        </View>
      }

    </View>
  );
}

export {Muro};