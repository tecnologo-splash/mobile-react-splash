import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const InfoSeguidores = ({cantSeguidores,cantSeguidos}) => {
    const navigation = useNavigation();
  return (
    <List.Section>
    <View style={{flexDirection:'row', flex: 1, alignItems:'stretch'}}>
      <List.Item style={{flex:1}} title="Seguidores" left={()=> <List.Icon icon="account-arrow-left" />} right={()=> <Text style={styles.cantidad}>{cantSeguidores}</Text>} onPress={()=>navigation.navigate("Seguidores")} />
      <List.Item style={{flex:1}} title="Seguidos" left={()=> <List.Icon icon="account-arrow-right" />} right={()=> <Text style={styles.cantidad}>{cantSeguidos}</Text>} onPress={()=>navigation.navigate("Seguidos")} />
    </View>
  </List.Section>
  );
}

const styles = StyleSheet.create({
    cantidad:{
      alignSelf:'center',
      fontSize: 18,
      fontWeight: 'bold'
    }
  })
export default InfoSeguidores;