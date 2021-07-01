//import liraries
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';

// create a component
const InfoSeguidoresExterno = ({cantSeguidores,cantSeguidos}) => {
    return (
        <List.Section>
        <View style={{flexDirection:'row', flex: 1, alignItems:'stretch'}}>
          <List.Item style={{flex:1}} title="Seguidores" left={()=> <List.Icon icon="account-arrow-left" />} right={()=> <Text style={styles.cantidad}>{cantSeguidores}</Text>} />
          <List.Item style={{flex:1}} title="Seguidos" left={()=> <List.Icon icon="account-arrow-right" />} right={()=> <Text style={styles.cantidad}>{cantSeguidos}</Text>} />
        </View>
      </List.Section>
    );
};

const styles = StyleSheet.create({
    cantidad:{
      alignSelf:'center',
      fontSize: 18,
      fontWeight: 'bold'
    }
  })

//make this component available to the app
export default InfoSeguidoresExterno;
