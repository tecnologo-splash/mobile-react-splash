import React, {useEffect, useContext, useState} from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import IconoEditar from './IconoEditar';
import InfoBasica from './InfoBasica';
import InfoSeguidores from './InfoSeguidores';
import MoreInfo from './MoreInfo';
import EditFotoPerfil from '../../pantallas/EditFotoPerfil';
import { baseUriMultimedia } from '../../config/configs';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import BotonOrden from '../muro/BotonOrden';

const PerfilBody = ({usuario:{id,url_perfil,nombre,apellido,usuario,correo,fecha_nacimiento,biografia,genero},cantSeguidores, cantSeguidos}) => {

  const url = url_perfil ? { uri: `${baseUriMultimedia}${url_perfil}` } : require('../../../assets/perfilDefault.jpg');
  const navigation = useNavigation();
  const [page,setPage] = useState(0);
  const {state:{publicacionesUsuario, orden, tipoOrden}, listarPublicacionesUsuario} = useContext(PublicacionContext);
  useEffect(()=>{
    if(usuario){
      navigation.setOptions({ title: `${nombre} ${apellido}`});
      publicacionesUsuarioLista(0);
    }
  },[usuario, orden, tipoOrden]);

  const publicacionesUsuarioLista = (pagina)=>{
    listarPublicacionesUsuario({userId: id,page: pagina,tipoOrden,orden});
    setPage(pagina+1);
}
  
  const editarFotoPerfil = () => {
    navigation.navigate("EditFotoPerfil")
  }
    
  return (
    <View style={styles.scroll}>
      
      <ScrollView onScrollEndDrag={()=>publicacionesUsuarioLista(page)}>
      <ListItem>
          <Avatar 
            rounded 
            source={url}
            size="large"
            onPress={editarFotoPerfil} 
          >  
          <Avatar.Accessory
              name='pencil'  
              type='font-awesome' 
              size={24}
              onPress={editarFotoPerfil}
          />
          </Avatar>
          <InfoBasica nombre={nombre} usuario={usuario} apellido={apellido} correo={correo} />
        </ListItem>
        <Divider style={{ backgroundColor: '#6F32C1' }} />
        <View>
          <InfoSeguidores cantSeguidores= {cantSeguidores} cantSeguidos={cantSeguidos} />
          <MoreInfo 
            genero={genero} 
            fecha_nacimiento={fecha_nacimiento} 
            biografia={biografia} 
            publicaciones={publicacionesUsuario}/>
        </View>
      </ScrollView>
      <BotonOrden />
      <IconoEditar/>
    </View>
  );
}

const styles = StyleSheet.create({
    scroll:{
        color:'#6d31bf',
        flex:1
    }
  })

export default PerfilBody;