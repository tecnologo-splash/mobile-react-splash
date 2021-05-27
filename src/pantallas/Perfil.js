import React, {useContext,useEffect} from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import {Context as PerfilContext} from '../context/PerfilContext';
import { FAB, List } from 'react-native-paper';

import {Avatar, ListItem, Divider, Button} from 'react-native-elements';

const Perfil = () => {

  const {state:{currentUser}, getInfo} = useContext(PerfilContext)


  
  useEffect(()=>{
    getInfo()
  },[])

  return (
    <ScrollView>
      <ListItem>
        {currentUser && currentUser.url_perfil !== null ? 
          <Avatar 
            rounded 
            source={{ uri: currentUser.url_perfil }}
            size="large"
            onPress={()=> console.log("changePhoto")} 
          />  
        :
          <Avatar 
            rounded 
            source={require('../../assets/perfilDefault.jpg')} 
            size="large"
            onPress={()=> console.log("changePhoto")} 
          >  
            <Avatar.Accessory
                name='pencil'  
                type='font-awesome' 
                size={24}
                onPress={()=> console.log("changePhoto")}
            />
          </Avatar>
        }
          <ListItem.Content>
            <ListItem.Title>Joaquín Mansilla</ListItem.Title>
            <ListItem.Subtitle>Programador</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Divider style={{ backgroundColor: '#6F32C1' }} />
        <View>
          <List.Section>
            <List.Item title="Seguidores" left={()=> <List.Icon icon="account-arrow-left" />} right={()=> <List.Icon icon="chevron-right" />} onPress={()=>console.log("seguidores")} />
            <List.Item title="Seguidos" left={()=> <List.Icon icon="account-arrow-right" />} right={()=> <List.Icon icon="chevron-right" />} onPress={()=>console.log("seguidos")} />
              
            
          </List.Section>
        </View>
        <FAB
          style={styles.fab}
          large
          icon="account-edit"
          onPress={() => console.log('Editar Perfil')}
          
        />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export {Perfil};