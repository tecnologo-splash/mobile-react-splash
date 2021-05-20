import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';


import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as InicioSesionProvider} from './src/context/InicioSesionContext';


import {InicioSesion, Muro, Perfil, Registro, Conversaciones, NuevaPublicacion} from './src/pantallas';

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
const BottomTab = createBottomTabNavigator();

const BottomNavigator = ()=> (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Muro" component={Muro}/>
      <BottomTab.Screen name="Conversaciones" component={Perfil}/>
      <BottomTab.Screen name="NuevaPublicacion" component={NuevaPublicacion}/>
    </BottomTab.Navigator>
);
export default function App() {
  return (
    <InicioSesionProvider>
      <PaperProvider theme={theme}>

        <NavigationContainer>

          <Stack.Navigator>
            <Stack.Screen name="InicioSesion" component={InicioSesion}  options={{headerShown: false}}/>
            <Stack.Screen name="Registro" component={Registro} options={{headerShown: false}}/>
            <Stack.Screen name="BottomTab" component={BottomNavigator}/>
          </Stack.Navigator>

        </NavigationContainer>

      </PaperProvider>
    </InicioSesionProvider>
  );
}
