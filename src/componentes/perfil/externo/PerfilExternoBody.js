import React, { useContext, useEffect, useState } from 'react';
import InfoBasica from '../InfoBasica';
import { useNavigation } from '@react-navigation/native';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import { StyleSheet, ScrollView, View } from 'react-native';
import MoreInfo from '../MoreInfo';
import { Text } from 'react-native';
import { baseUriMultimedia } from '../../../config/configs';
import {Context as PublicacionContext} from '../../../context/PublicacionContext';
import {Context as ListarUsuariosContext} from '../../../context/ListarUsuariosContext';
import {Context as PerfilContext} from '../../../context/PerfilContext';
import { colores } from '../../../config/colores';
import Denuncia from './Denuncia';
import InfoSeguidoresExterno from './InfoSeguidoresExterno';
import BotonOrden from '../../muro/BotonOrden';
import { Portal } from 'react-native-paper';

const PerfilExternoBody = ({usuario:{nombre,id, apellido, usuario, correo, url_perfil, genero, fecha_nacimiento, biografia, cantidad_usuarios_seguidores, cantidad_usuarios_siguiendo, lo_sigo}}) => {
    const {state:{publicacionesExterno, orden, tipoOrden},listarPublicacionesExterno} = useContext(PublicacionContext);
    const {dejarDeSeguirUsuario, seguirUsuario} = useContext(ListarUsuariosContext);
    const {cambiar_lo_sigo} = useContext(PerfilContext);
    const [page,setPage] = useState(0);
    const [visible,setVisible] = useState(false);
    const url = url_perfil ? { uri: `${baseUriMultimedia}${url_perfil}`} : require('../../../../assets/perfilDefault.jpg');
    const navigation = useNavigation();

    useEffect(()=>{
        if(usuario){
          navigation.setOptions({ title: `${nombre} ${apellido}`});
        }
        if (lo_sigo){
          publicacionesUsuarioLista(0);
        }
    },[usuario, orden, tipoOrden, lo_sigo, id]);


    const publicacionesUsuarioLista = (pagina)=>{
        listarPublicacionesExterno({userId: id,page: pagina,tipoOrden,orden});
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
    
    const denunciar = () =>{
      setVisible(true);
    }
  return (
    <View style={styles.scroll}>
        <ScrollView>
          <ListItem>
              <Avatar 
                  rounded 
                  source={url}
                  size="large"
                  onPress={()=> console.log("expand")} 
              />  
              <InfoBasica nombre= {nombre} apellido= {apellido} usuario={usuario} correo={correo} />
              {lo_sigo ?
                <View style ={styles.options}>
                <Text style={{...styles.text, color: '#dd182f'}} onPress={()=>dejarSeguir()}>Dejar de seguir</Text>
                <Text style={{...styles.text, color: colores.gris}} onPress={()=>denunciar()}>Denunciar</Text>
                </View>
                :
                <Text style={{...styles.text, color: '#296fe8'}} onPress={()=>seguir()}>Seguir</Text>
              }
          </ListItem>
          <Divider style={{ backgroundColor: '#6F32C1' }} />
          {lo_sigo? <InfoSeguidoresExterno cantSeguidores= {cantidad_usuarios_seguidores} cantSeguidos={cantidad_usuarios_siguiendo} />
            :null}
        </ScrollView>
          {lo_sigo?
              <MoreInfo 
                genero={genero} 
                fecha_nacimiento={fecha_nacimiento} 
                biografia={biografia} 
                publicaciones={publicacionesExterno} 
                onEnd={()=>publicacionesUsuarioLista(page)}
                onRefresh={()=>publicacionesUsuarioLista(0)} />
              :
              <Text style={{alignSelf: 'center', marginTop:5}}>Seguir para mas informacion</Text>
          }
      <Portal.Host style={{flex: 1}}>
        <BotonOrden />
      </Portal.Host>
      <Denuncia usuarioId= {id} visible={visible} setVisible={()=>setVisible(false)}/>
    </View>
  );
}
const styles = StyleSheet.create({
    scroll:{
        color:'#6d31bf',
        flex: 1
    },
    text:{
      fontWeight:'600',
      fontSize:15
    },
    options:{
      flex:1,
      justifyContent: 'space-between'
    }
  });
export default PerfilExternoBody;