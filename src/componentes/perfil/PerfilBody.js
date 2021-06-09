import React, {useEffect} from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import IconoEditar from './IconoEditar';
import InfoBasica from './InfoBasica';
import InfoSeguidores from './InfoSeguidores';
import MoreInfo from './MoreInfo';
import EditFotoPerfil from '../../pantallas/EditFotoPerfil'

const PerfilBody = ({usuario:{url_perfil,nombre,apellido,usuario,correo,fecha_nacimiento,biografia,genero},cantSeguidores, cantSeguidos}) => {

  const url = url_perfil ? { uri: url_perfil } : require('../../../assets/perfilDefault.jpg');
  const navigation = useNavigation();
  useEffect(()=>{
    if(usuario){
      navigation.setOptions({ title: `${nombre} ${apellido}`});
    }
  },[usuario]);


  
  const editarFotoPerfil = () => {
    navigation.navigate("EditFotoPerfil")
  }
    
  return (
    <View style={styles.scroll}>
      <ScrollView>
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
          <MoreInfo genero={genero} fecha_nacimiento={fecha_nacimiento} biografia={biografia} />
        </View>
      </ScrollView>
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