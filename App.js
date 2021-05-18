import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import InicioSesion from './src/pantallas/InicioSesion';
import Registro from './src/pantallas/Registro';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as InicioSesionProvider} from './src/context/InicioSesionContext';

const theme = {
  ...DefaultTheme,
  roundness:2,
  colors:{
    ...DefaultTheme.colors,
    primary:'#6F32C1',
    accent:'#000666'
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <InicioSesionProvider>
      <PaperProvider theme={theme}>

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="InicioSesion" component={InicioSesion}  options={{headerShown: false}}/>
            <Stack.Screen name="Registro" component={Registro} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>

      </PaperProvider>
    </InicioSesionProvider>
  );
}
