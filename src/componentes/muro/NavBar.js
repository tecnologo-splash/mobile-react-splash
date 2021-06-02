import React, {useContext} from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Tooltip } from 'react-native-elements';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Context as ListarUsuariosContext} from '../../context/ListarUsuariosContext';

const NavBar = () => {
  const navigation = useNavigation();
  const {state:{buscar,filtro},cambiarValor, listarUsuariosParaSeguir} = useContext(ListarUsuariosContext);

  return (
    <Appbar.Header style={{backgroundColor: '#6F32C1'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Perfil")}>
          <Image style={styles.image} source={require('../../../assets/perfilDefault.jpg')}/>
        </TouchableOpacity>
        <View style={styles.searchBar}>
        <FontAwesome name="search" size={24} color="white" style={styles.magnify} onPress={()=>listarUsuariosParaSeguir({filtro: filtro, valor: buscar})} />
        <TextInput
        placeholder="Search"
        placeholderTextColor='#fff'
        value={buscar}
        onChangeText={text => cambiarValor({variable:"buscar", valor: text})}
        style={styles.input}
        />
        </View>
        <Tooltip
            backgroundColor="#6d31bf"
            withOverlay= {false}
            popover={<Text>Hola</Text>}>
            <Appbar.Action icon="dots-vertical" color='#fff'/>
            </Tooltip>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
    image:{
      height: 35, 
      width: 35, 
      borderRadius: 50,
      borderWidth: 2,
      borderColor:'#fff',
      marginLeft: 20,
    },
    searchBar:{
      marginLeft: 15, 
      flex: 1, 
      flexDirection: 'row'
    },
    input:{
      color: '#fff',
      height:35,
      marginLeft: 15,
      flex: 1,
      borderBottomColor:'#fff',
      borderBottomWidth: 1
    },
    magnify:{alignSelf: 'center'}
});

export default NavBar;