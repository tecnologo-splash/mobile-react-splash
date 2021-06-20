import React, { useContext, useEffect, useState } from 'react';
import InfoBasica from '../InfoBasica';
import { useNavigation } from '@react-navigation/native';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import { StyleSheet, ScrollView, View } from 'react-native';
import InfoSeguidores from '../InfoSeguidores';
import MoreInfo from '../MoreInfo';
import { Text } from 'react-native';
import { baseUriMultimedia } from '../../../config/configs';
import {Context as PublicacionContext} from '../../../context/PublicacionContext';
import {Context as ListarUsuariosContext} from '../../../context/ListarUsuariosContext';
import {Context as PerfilContext} from '../../../context/PerfilContext';

const PerfilExternoBody = ({usuario:{nombre,id, apellido, usuario, correo, url_perfil, genero, fecha_nacimiento, biografia, cantidad_usuarios_seguidores, cantidad_usuarios_siguiendo, lo_sigo}}) => {
    const {state:{publicacionesUsuario, orden, tipoOrden},listarPublicacionesUsuario} = useContext(PublicacionContext);
    const {dejarDeSeguirUsuario, seguirUsuario} = useContext(ListarUsuariosContext);
    const {cambiar_lo_sigo} = useContext(PerfilContext)
    const [page,setPage] = useState(0);
    const url = url_perfil ? { uri: `${baseUriMultimedia}${url_perfil}`} : require('../../../../assets/perfilDefault.jpg');
    const navigation = useNavigation();

    useEffect(()=>{
        if(usuario){
          navigation.setOptions({ title: `${nombre} ${apellido}`});
        }
        if (lo_sigo){
          console.log("PUBLICACIONES USUARIO LISTA");
          publicacionesUsuarioLista(0);
        }
    },[usuario, orden, tipoOrden, lo_sigo]);


    const publicacionesUsuarioLista = (pagina)=>{
        listarPublicacionesUsuario({userId: id,page: pagina,tipoOrden,orden});
        setPage(pagina+1);
    }

    const dejarSeguir = () => {
        dejarDeSeguirUsuario(id);
        cambiar_lo_sigo({lo_sigo:false});
    }

    const seguir = async () =>{
      await seguirUsuario(id);
      cambiar_lo_sigo({lo_sigo:true});
    }
  return (
    <View style={styles.scroll}>
        <ScrollView onScrollEndDrag={()=>publicacionesUsuarioLista(page)}>
            <ListItem>
                <Avatar 
                    rounded 
                    source={url}
                    size="large"
                    onPress={()=> console.log("expand")} 
                />  
                <InfoBasica nombre= {nombre} apellido= {apellido} usuario={usuario} correo={correo} />
                {lo_sigo ?
                  <Text style={{...styles.text, color: '#dd182f'}} onPress={()=>dejarSeguir()}>Dejar de seguir</Text>
                  :
                  <Text style={{...styles.text, color: '#296fe8'}} onPress={()=>seguir()}>Seguir</Text>
                }
            </ListItem>
            <Divider style={{ backgroundColor: '#6F32C1' }} />
            {lo_sigo?
                <View>
                    <InfoSeguidores cantSeguidores= {cantidad_usuarios_seguidores} cantSeguidos={cantidad_usuarios_siguiendo} />
                    <MoreInfo genero={genero} fecha_nacimiento={fecha_nacimiento} biografia={biografia} publicaciones={publicacionesUsuario} />
                </View>
                :
                <Text>Seguir para mas informacion</Text>
            }
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    scroll:{
        color:'#6d31bf',
        flex:1
    },
    text:{
      fontWeight:'600',
      fontSize:15
    }
  });
export default PerfilExternoBody;