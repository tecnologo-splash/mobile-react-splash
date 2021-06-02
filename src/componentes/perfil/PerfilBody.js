import React, {useEffect} from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import IconoEditar from './IconoEditar';
import { getFecha, getGenero } from './getDatos';

const PerfilBody = ({usuario:{url_perfil,nombre,apellido,usuario,correo,fecha_nacimiento,biografia,genero},cantSeguidores, cantSeguidos}) => {

    const url = url_perfil ? { uri: url_perfil } : require('../../../assets/perfilDefault.jpg');
    const navigation = useNavigation();
    useEffect(()=>{
        if(usuario){
          navigation.setOptions({ title: `${nombre} ${apellido}`});
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
          >  
          <Avatar.Accessory
              name='pencil'  
              type='font-awesome' 
              size={24}
              onPress={()=> console.log("changePhoto")}
          />
          </Avatar>
          <ListItem.Content>
            <ListItem.Title>{nombre} {apellido}</ListItem.Title>
            <ListItem.Subtitle>{usuario}</ListItem.Subtitle>
            <ListItem.Subtitle>{correo}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Divider style={{ backgroundColor: '#6F32C1' }} />
        <View>
          <List.Section>
            <View style={{flexDirection:'row', flex: 1, alignItems:'stretch'}}>
              <List.Item style={{flex:1}} title="Seguidores" left={()=> <List.Icon icon="account-arrow-left" />} right={()=> <Text style={styles.cantidad}>{cantSeguidores}</Text>} onPress={()=>navigation.navigate("Seguidores")} />
              <List.Item style={{flex:1}} title="Seguidos" left={()=> <List.Icon icon="account-arrow-right" />} right={()=> <Text style={styles.cantidad}>{cantSeguidos}</Text>} onPress={()=>navigation.navigate("Seguidos")} />
            </View>
          </List.Section>
          <List.Section>
            <List.Accordion
              title="Mas Informacion">
              <List.Item title={`Fecha de Nacimiento: ${fecha_nacimiento? getFecha(fecha_nacimiento):''}`} />
              <View style={{flexDirection:'row'}}>
                <Text style={styles.genero}>Genero: </Text>
                {getGenero(genero)}
              </View>
              <List.Accordion
                title="Biografia">
                <List.Item title={`${biografia ? biografia : '-'}`} />
              </List.Accordion>
            </List.Accordion>
            <List.Accordion
              title="Publicaciones">
              <List.Item title="Publicaciones" />
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
      <IconoEditar/>
    </View>
  );
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      alignSelf:'flex-end'
    },
    scroll:{
        color:'#6d31bf',
        flex:1
    },
    genero:{
      marginLeft: 15,
      fontSize: 16,
      marginTop:2,
      marginRight:5
    },
    cantidad:{
      alignSelf:'center',
      fontSize: 18,
      fontWeight: 'bold'
    }
  })

export default PerfilBody;