import React, { useContext, useEffect } from 'react';
import InfoBasica from '../InfoBasica';
import { useNavigation } from '@react-navigation/native';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import { StyleSheet, ScrollView, View } from 'react-native';
import InfoSeguidores from '../InfoSeguidores';
import MoreInfo from '../MoreInfo';
import { Text } from 'react-native';
import { baseUriMultimedia } from '../../../config/configs';
import {Context as PublicacionContext} from '../../../context/PublicacionContext';

const PerfilExternoBody = ({usuario:{nombre,id, apellido, usuario, correo, url_perfil, genero, fecha_nacimiento, biografia, lo_sigo}}) => {
    const {state:{publicacionesUsuario},listarPublicacionesUsuario} = useContext(PublicacionContext);
    const url = url_perfil ? { uri: `${baseUriMultimedia}${url_perfil}`} : require('../../../../assets/perfilDefault.jpg');
    const navigation = useNavigation();

    useEffect(()=>{
        if(usuario){
          navigation.setOptions({ title: `${nombre} ${apellido}`});
          listarPublicacionesUsuario({userId: id});
        }
      },[usuario]);

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
            </ListItem>
            <Divider style={{ backgroundColor: '#6F32C1' }} />
            {lo_sigo?
                <View>
                    <InfoSeguidores cantSeguidores= {0} cantSeguidos={0} />
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
    }
  })

export default PerfilExternoBody;