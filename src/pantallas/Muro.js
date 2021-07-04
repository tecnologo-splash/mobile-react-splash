import React, {useContext, useEffect, useState, useCallback} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {Context as ListarUsuariosContext} from '../context/ListarUsuariosContext';
import {Context as PublicacionContext} from '../context/PublicacionContext';
import { ListItem } from 'react-native-elements'
import NavBar from '../componentes/muro/NavBar';
import ListadoUsuarios from '../componentes/listado-usuarios/ListadoUsuarios';
import ListadoSugeridos from '../componentes/listado-sugeridos/ListadoSugeridos';
import ListadoPublicaciones from '../componentes/publicaciones/ListadoPublicaciones';
import Cargando from '../componentes/Cargando';
import { colores } from '../config/colores';
import { List, Portal, FAB, Dialog, Button } from 'react-native-paper';
import BotonOrden from '../componentes/muro/BotonOrden';
import {Context as PerfilContext} from '../context/PerfilContext';
import {Context as ComentariosContext} from '../context/ComentariosContext';
import {Context as InicioSesionContext} from '../context/InicioSesionContext';
import { MaterialIcons } from '@expo/vector-icons'; 
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import { notificaciones } from '../config/configs';
import { getCurrentInfo } from '../servicios/infoService';

//import {init} from '../../initPusher';

const Muro = ({navigation}) => {

  const [page, setPage] = useState(0);
  const [pageSugeridos, setPageSugeridos] = useState(0);
  const[pagePublicaciones, setPagePublicaciones] = useState(0);
  const[ocultarSugeridos, setOcultarSugeridos] = useState(false);
  const {cerrarSesion} = useContext(InicioSesionContext);
  const {state:{filtro,buscar,usuarios, cargando, sugeridos},listarUsuariosParaSeguir, listarUsuariosSugeridos} = useContext(ListarUsuariosContext);
  const {state:{publicaciones, orden, tipoOrden, redireccionar}, listarPublicacionesMuro} = useContext(PublicacionContext);
  const {state:{comentarios}} = useContext(ComentariosContext);
  const {state:{currentUser}, getInfo}= useContext(PerfilContext);
  
  const [notificacionesVivas, setNotificacionesVivas] = useState([]);
  const [cantNotificaciones, setCantNotificaciones] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  const vaciarNotificaciones = () =>{
    const notif = notificacionesVivas;
    
    for (let i = notif.length; i > 0; i--) {
      notif.pop();
    }

    setNotificacionesVivas(notif)
    
    setCantNotificaciones(0);
    setVisible(false);
  }

  //const interest = `users-${currentUser.id}`
  useEffect(()=>{

    getCurrentInfo().then((response)=>{
        const id = response.data.id
        init(`users-${id}`); 
    })
    

    setTodoaCero();
    if(redireccionar == true){
      cerrarSesion();
      navigation.navigate('InicioSesion');
    }
    
  },[]);


  //*****************************//
  //        Inicio PUSHER        //
  //*****************************//
  
  const init = (interest) => {
    // Set your app key and register for push
    RNPusherPushNotifications.setInstanceId("467be457-32c8-4e24-bede-31f801954fbe");
  
    // Init interests after registration
    RNPusherPushNotifications.on('registered', () => {
      subscribe(interest);
    });
  
    // Setup notification listeners
    RNPusherPushNotifications.on('notification', handleNotification);
  };
  
  const handleNotification = notification => {
    console.log(notification);
    
    // iOS app specific handling
        if (Platform.OS === 'ios') {
            switch (notification.appState) {
                case 'inactive':
                // inactive: App came in foreground by clicking on notification.
                //           Use notification.userInfo for redirecting to specific view controller
                case 'background':
                // background: App is in background and notification is received.
                //             You can fetch required data here don't do anything with UI
                case 'active':
                // App is foreground and notification is received. Show a alert or something.
                default:
                break;
            }
        } else {
            if (!notificacionesVivas.includes(notification.body)){
              const notif = notificacionesVivas;
              notif.push(notification.body);
              setNotificacionesVivas(notif)
              const cant = notif.length
              setCantNotificaciones(cantNotificaciones+1)
              
            }
            
        }
    }
    
    // Subscribe to an interest
    const subscribe = interest => {
    // Note that only Android devices will respond to success/error callbacks
        RNPusherPushNotifications.subscribe(
            interest,
            (statusCode, response) => {
            console.error(statusCode, response);
            },
            () => {
            console.log('Success');
            }
        );
    };
    //*****************************//
    //        FIN PUSHER           //
    //*****************************//



  const memorizedCallback = useCallback(()=>{
    setTodoaCero();
    if(redireccionar == true){
      cerrarSesion();
      navigation.navigate('InicioSesion');
    }
  },[buscar, filtro, orden, tipoOrden, currentUser, comentarios, redireccionar],)

  const setTodoaCero = ()=> {
    listarUsuarios(0);
    listarSugeridos(0);
    listarPublicaciones(0);
  }
  const listarUsuarios = async (pagina)=>{
    await listarUsuariosParaSeguir({filtro, valor:buscar, page: pagina, currentUserId: currentUser.id});
    setPage(pagina+1);
  }

  const listarSugeridos = async (pagina) =>{
    if(pagina>=0){
      await listarUsuariosSugeridos({page: pagina, currentUser: currentUser.usuario});
    }
    setPageSugeridos(pagina+1);
  }
  
  const listarPublicaciones = async (pagina) =>{
    if(pagina>=0){
      await listarPublicacionesMuro({page: pagina, orden: orden, tipoOrden: tipoOrden});
    }
    
    setPagePublicaciones(pagina+1);
  }

  return (
    <View style={{ flex:1}}>
        <Portal>
        
        {cantNotificaciones > 0 &&
        <FAB
          style={styles.fab}
          medium
          label="hola"
          icon="bell-outline"
          onPress={()=>setVisible(true)}
        />
      }

        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
              {
                notificacionesVivas.map((notif,index)=>
                  <ListItem key={index}>
                    <ListItem.Content>
                      <ListItem.Title>{notif}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )
              }
              <Button onPress={()=>vaciarNotificaciones()}>Vaciar Notificaciones</Button>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
      <NavBar buscador={true} tituloNavBar={''}/>
      {buscar!='' ? 
        <ListadoUsuarios usuarios={usuarios} onEnd={()=>listarUsuarios(page)}/>
        :
        <View>
          {ocultarSugeridos? null:
            <View>
              <ListadoSugeridos sugeridos={sugeridos} onEnd={()=>listarSugeridos(pageSugeridos)} onStart={()=>listarSugeridos(pageSugeridos-2)}/>
            </View>
          }
          <ListadoPublicaciones 
          publicaciones = {publicaciones}
          onEnd={()=>listarPublicaciones(pagePublicaciones)} 
          onRefresh={()=>listarPublicaciones(0)}/>
          <Cargando estaCargando={cargando} color={colores.appDefault} />
          <Portal.Host style={{flex: 1}}>
            <Portal>
              <View style={{alignItems:'flex-end'}}>
                {ocultarSugeridos? 
                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" onPress={()=> setOcultarSugeridos(!ocultarSugeridos)}/>:
                <MaterialIcons name="keyboard-arrow-up" size={24} color="black" onPress={()=> setOcultarSugeridos(!ocultarSugeridos)}/>
                }
              </View>
            </Portal>
            <View style={{paddingBottom: 200}}>
            <BotonOrden/>
            </View>
          </Portal.Host>
        </View>
      }

    </View>
  );
}

export {Muro};


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 100,
    backgroundColor:'#6d31bf'
  },

})
