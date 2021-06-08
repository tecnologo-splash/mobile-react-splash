import React, {useContext} from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {Context as PerfilContext} from '../../context/PerfilContext';
const SearchBar = () => {
    const {state:{buscar},cambiarValor} = useContext(PerfilContext);
  return (
    <Appbar style={{backgroundColor: '#6F32C1'}}>
        <View style={styles.searchBar}>
            <FontAwesome name="search" size={24} color="white" style={styles.magnify} onPress={()=>cambiarValor({variable: "buscar", valor: text})} />
            <TextInput
            placeholder="Search"
            placeholderTextColor='#fff'
            value={buscar}
            onChangeText={text => cambiarValor({variable: "buscar", valor: text})}
            style={styles.input}
            />
        </View>
    </Appbar>
  );
}
const styles = StyleSheet.create({
    searchBar:{
      marginLeft: 15, 
      marginRight: 15,
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


export default SearchBar;