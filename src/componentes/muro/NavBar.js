import React, {useState} from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Tooltip } from 'react-native-elements';
import { Text } from 'react-native';

const NavBar = () => {
  const [text, setText] = useState('');
  console.log(text);
  return (
    <Appbar.Header style={{backgroundColor: '#6F32C1'}}>
        <Image  style={styles.image} source={require('../../../assets/icon_dark.png')}/>
        <View style={styles.searchBar}>
        <FontAwesome name="search" size={24} color="white" style={styles.magnify} />
        <TextInput
        placeholder="Search"
        placeholderTextColor='#fff'
        value={text}
        onChangeText={text => setText(text)}
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