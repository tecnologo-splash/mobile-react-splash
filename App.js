import React,{useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';


import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as InicioSesionProvider} from './src/context/InicioSesionContext';
import {Provider as CrearCuentaProvider} from './src/context/CrearCuentaContext';
import {Provider as PerfilProvider} from './src/context/PerfilContext';
import {Provider as PublicacionProvider} from './src/context/PublicacionContext';
import {Provider as ListarUsuariosProvider} from './src/context/ListarUsuariosContext';
import {Provider as NotificacionesProvider} from './src/context/NotificacionesContext';
import {Provider as ComentariosProvider} from './src/context/ComentariosContext'; 
import {Provider as ConversacionProvider} from './src/context/ConversacionContext'; 

import {InicioSesion, Muro, Perfil, Registro, Conversaciones, PerfilExterno, NuevaPublicacion, Seguidores, Seguidos, EditarPerfil, EditFotoPerfil, Comentarios, NuevaConversacion, MensajesConversacion} from './src/pantallas';

import { FontAwesome } from '@expo/vector-icons'; 
import { colores } from './src/config/colores';


import { SafeAreaProvider } from 'react-native-safe-area-context';



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
    <BottomTab.Navigator 
    barStyle={{backgroundColor:colores.appDefault}} 
    tabBarOptions={colors}
    sceneAnimationEnabled
    keyboardHidesNavigationBar
    initialRouteName="Muro" 
    shifting> 
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
      sceneAnimationEnabled
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
    <SafeAreaProvider>
      <InicioSesionProvider>
        <PaperProvider theme={theme}>
          <CrearCuentaProvider>
            <PerfilProvider>
              <ListarUsuariosProvider>
                <NotificacionesProvider>
                  <ConversacionProvider>
                    <PublicacionProvider>
                      <ComentariosProvider>
                        <NavigationContainer>

                          <Stack.Navigator>
                            <Stack.Screen name="InicioSesion" component={InicioSesion}  options={{headerShown: false}}/>
                            <Stack.Screen name="Registro" component={Registro} options={{headerShown: false}}/>
                            <Stack.Screen name="BottomTab" component={BottomNavigator} options={{headerShown: false}}/>
                            <Stack.Screen name="Perfil" component={Perfil} options={{...stackOptions, title:''}}/>
                            <Stack.Screen name="Seguidores" component={Seguidores} options={stackOptions}/>
                            <Stack.Screen name="Seguidos" component={Seguidos} options={stackOptions}/>
                            <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={stackOptions}/>
                            <Stack.Screen name="PerfilExterno" component={PerfilExterno} options={stackOptions} />
                            <Stack.Screen name="Comentarios" component={Comentarios} options={stackOptions}/>
                            <Stack.Screen name="EditFotoPerfil" component={EditFotoPerfil} options={stackOptions}/>
                            <Stack.Screen name="NuevaConversacion" component={NuevaConversacion} options={stackOptions}/>
                            <Stack.Screen name="MensajesConversacion" component={MensajesConversacion} options={stackOptions}/>
                          </Stack.Navigator>

                        </NavigationContainer>
                      </ComentariosProvider>
                    </PublicacionProvider>    
                  </ConversacionProvider>
                </NotificacionesProvider>
              </ListarUsuariosProvider>
            </PerfilProvider>
          </CrearCuentaProvider>
        </PaperProvider>
      </InicioSesionProvider>
    </SafeAreaProvider>
  );
}
