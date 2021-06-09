import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Colors, Portal } from 'react-native-paper';

const Cargando = ({estaCargando, color}) => {
    if(estaCargando){
        return (
            <View style={{margin: 10}}>
              <ActivityIndicator animating={estaCargando} color={color} hidesWhenStopped={true} size="large"/>
          </View>
        );
    }else{
        return null;
    }
  
}

export default Cargando;