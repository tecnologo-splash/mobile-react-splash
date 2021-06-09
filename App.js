import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';


import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as InicioSesionProvider} from './src/context/InicioSesionContext';
import {Provider as CrearCuentaProvider} from './src/context/CrearCuentaContext';
import {Provider as PerfilProvider} from './src/context/PerfilContext';
import {Provider as ListarUsuariosProvider} from './src/context/ListarUsuariosContext';
import {Provider as NotificacionesProvider} from './src/context/NotificacionesContext';

import {InicioSesion, Muro, Perfil, Registro, Conversaciones, PerfilExterno, NuevaPublicacion, Seguidores, Seguidos, EditarPerfil, EditFotoPerfil} from './src/pantallas';

import { FontAwesome } from '@expo/vector-icons'; 

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
const BottomTab = createMaterialBottomTabNavigator();
const colors = {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
  }

const BottomNavigator = ()=> (
    <BottomTab.Navigator barStyle={{backgroundColor:'#6F32C1'}} tabBarOptions={colors} shifting> 
      <BottomTab.Screen 
      name="Conversaciones" 
      component={Conversaciones}
      
      options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="comments" size={24} color={color} />
        ),
      }}
      />
      <BottomTab.Screen 
      name="Muro" 
      component={Muro}

      options={{
        tabBarLabel: 'Muro',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={24} color={color} />
        ),
      }}
      />
      <BottomTab.Screen 
      name="NuevaPublicacion" 
      component={NuevaPublicacion}

      options={{
        tabBarLabel: 'Publicar',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="plus" color={color} size={24}/>
        ),
      }}
      />
    </BottomTab.Navigator>
);
export default function App() {
  const stackOptions={headerShown: true, headerStyle: {backgroundColor:'#6d31bf'}, headerTitleStyle:{color:'#ffffff'}, headerTintColor: '#fff'}
  return (
    
    <InicioSesionProvider>
      <PaperProvider theme={theme}>
        <CrearCuentaProvider>
          <PerfilProvider>
            <ListarUsuariosProvider>
              <NotificacionesProvider>
                <NavigationContainer>

                <Stack.Navigator>
                  <Stack.Screen name="InicioSesion" component={InicioSesion}  options={{headerShown: false}}/>
                  <Stack.Screen name="Registro" component={Registro} options={{headerShown: false}}/>
                  <Stack.Screen name="BottomTab" component={BottomNavigator} options={{headerShown: false}}/>
                  <Stack.Screen name="Perfil" component={Perfil} options={{...stackOptions, title:''}}/>
                  <Stack.Screen name="Seguidores" component={Seguidores} options={stackOptions}/>
                  <Stack.Screen name="Seguidos" component={Seguidos} options={stackOptions}/>
                  <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={stackOptions}/>
                  <Stack.Screen name="PerfilExterno" component={PerfilExterno} options={stackOptions}/>
                  <Stack.Screen name="EditFotoPerfil" component={EditFotoPerfil} options={stackOptions}/>
                </Stack.Navigator>

                </NavigationContainer>
              </NotificacionesProvider>
            </ListarUsuariosProvider>
          </PerfilProvider>
        </CrearCuentaProvider>
      </PaperProvider>
    </InicioSesionProvider>

  );
}
