import React, {useEffect} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import IconoEditar from './IconoEditar';

const PerfilBody = ({usuario}) => {

    const url = usuario && usuario.url_perfil ? { uri: usuario.url_perfil } : require('../../../assets/perfilDefault.jpg');
    const navigation = useNavigation();
    useEffect(()=>{
        if(usuario.usuario){
          navigation.setOptions({ title: `${usuario.nombre} ${usuario.apellido}`});
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
            <ListItem.Title>{usuario.nombre} {usuario.apellido}</ListItem.Title>
            <ListItem.Subtitle>{usuario.usuario}</ListItem.Subtitle>
            <ListItem.Subtitle>{usuario.correo}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Divider style={{ backgroundColor: '#6F32C1' }} />
        <View>
          <List.Section>
            <View style={{flexDirection:'row', flex: 1, alignItems:'stretch'}}>
              <List.Item style={{flex:1}} title="Seguidores" left={()=> <List.Icon icon="account-arrow-left" />} right={()=> <List.Icon icon="chevron-right" />} onPress={()=>navigation.navigate("Seguidores")} />
              <List.Item style={{flex:1}} title="Seguidos" left={()=> <List.Icon icon="account-arrow-right" />} right={()=> <List.Icon icon="chevron-right" />} onPress={()=>navigation.navigate("Seguidos")} />
            </View>
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
    }
  })

export default PerfilBody;