import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Paragraph, Dialog, Portal, Title, Divider } from 'react-native-paper';
import {Context as PerfilContext} from '../context/PerfilContext';
import {Context as InicioSesionContext} from '../context/InicioSesionContext';
import {Context as NotificacionesContext} from '../context/NotificacionesContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { notificaciones, viaNotif } from '../config/configs';
import { Ionicons } from '@expo/vector-icons'; 
import { Settings } from 'react-native';

const EditarPerfil = () => {

  const {state:{currentUser, nombre, apellido, fechaNac, biografia }, cambiarValor, cambiarFecha, editarPerfil, getInfo} = useContext(PerfilContext);
  const {cerrarSesion} = useContext(InicioSesionContext);
  const {state:{configNotif}, getConfigNotif, editarNotif} = useContext(NotificacionesContext);

  const [fechaSeleccionada, setFechaSeleccionada] = useState(false);
  const [mensajeUsuario, setMensajeUsuario] = useState("");
  const navigation = useNavigation();
 
  
  useEffect(()=>{
    getConfigNotif()
  },[])


  const [newNotif, setNewNotif] = useState({configNotif})
  const onChangeNotif = (name, value) => {
    setNewNotif({...newNotif, [name]: value});
  }
  
  const cerrar = ()=>{
    cerrarSesion()
    navigation.navigate('InicioSesion');
  }

  const onChangeFecha = (event, selectedDate) =>{
    var date = selectedDate || fechaNac;
    cambiarFecha(date);
    setFechaSeleccionada(false);
  }

  const onSubmit = () => {
    let formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('fechaNacimiento', fechaNac.toISOString().split("T")[0]);
    console.log(fechaNac.toISOString().split("T")[0])
    formData.append('biografia', biografia);
    console.log(formData)
    editarPerfil(currentUser.id, formData)
      .then( data => {
        editarNotif(newNotif)
        getInfo()
        showDialog();
      });
  }


  const confirmDelete = () => {
    showDialog2();
  }

  const deleteAccount = () => {
    let formData = new FormData();
    formData.append('activo', false);
    editarPerfil(currentUser.id, formData)
      .then( data => {
        cerrar();
      });
  }

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  
  const [visible2, setVisible2] = useState(false);
  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => setVisible2(false);


  return (
  <View style={styles.body}>

      <ScrollView style={styles.container}>
        {console.log(configNotif)}
        <Title>Datos Personales</Title>
        <TextInput
          label={currentUser.nombre}
          value={nombre}
          onChangeText={text => cambiarValor({variable: 'nombre', valor: text})}
        />
        
        

        <TextInput
          label={currentUser.apellido}
          value={apellido}
          onChangeText={text => cambiarValor({variable: 'apellido', valor: text})}
        />

        <View style={styles.fecha}>
          {fechaSeleccionada? 
              <DateTimePicker
              mode="date"
              value={fechaNac}
              onChange={(event,selectedDate)=>onChangeFecha(event,selectedDate)}
              display="default"
              />
              :null}

          <Button
              style={styles.button}
              onPress={()=>setFechaSeleccionada(!fechaSeleccionada)}
              mode="outlined"
          >
            <Icon name="calendar" size= {20}/>
          </Button>
        
          <TextInput
            style={{width:"100%"}}
            label="Fecha"
            value={ fechaNac.toISOString().split('T')[0].split('-')[2] + "/" + fechaNac.toISOString().split('T')[0].split('-')[1] + "/" + fechaNac.toISOString().split('T')[0].split('-')[0] }
            disabled
          />
        </View>
        <TextInput
          label="Biografia"
          value={biografia}
          onChangeText={text => cambiarValor({variable: 'biografia', valor: text})}
        />
        <Divider />
        
        <Title><Ionicons size={24} name="notifications-outline"/> Configurar Notificaciones</Title>
        {console.log(newNotif)}

        {notificaciones.map((notificacion)=>{
          
          return(
            <View style={styles.cont}>
              <View style={styles.pickerContainer}>
                <Text style={{fontSize:20}}>{notificacion.text}</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={newNotif[notificacion.name]}
                  dropdownIconColor='#ffffff'
                  //itemStyle={{alignSelf: 'center'}}
                  onValueChange={(itemValue, itemIndex) =>
                    onChangeNotif(notificacion.name, itemValue)
                  }
                  >

                   {viaNotif.map((via, index)=>{
                     return( <Picker.Item key={index} label={via.texto} value={via.value} /*style={{alignSelf: 'center'}}*/ />)
                   })} 
                  
                </Picker>
              </View>
            </View>
          )
        })
        }



        {/* <View style={styles.cont}>
          <View style={styles.pickerContainer}>
              <Ionicons name="md-transgender-sharp" size={15} color="white" />
              <Picker
                  style={styles.picker}
                  selectedValue={genero}
                  dropdownIconColor='#ffffff'
                  itemStyle={{alignSelf: 'center'}}
                  onValueChange={(itemValue, itemIndex) =>
                      cambiarValor({variable: 'genero', valor: itemValue})
                  }>
                  <Picker.Item label="HOMBRE" value="HOMBRE"  style={{alignSelf: 'center'}}/>
                  <Picker.Item label="MUJER" value="MUJER" style={{alignSelf: 'center'}}/>
                  <Picker.Item label="OTRO" value="OTRO" style={{alignSelf: 'center'}}/>
              </Picker>
          </View>
      </View> */}


      </ScrollView>



      <Button
        style={styles.button}
        onPress={()=>onSubmit()}
        mode="contained"> 
          Guardar Datos
      </Button>
      
      <Button
        style={styles.button}
        onPress={()=>confirmDelete()}
        mode="outlined"
        color="red"> 
          Eliminar Cuenta
      </Button>







      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Exito</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Información actualizada con exito.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Aceptar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
      <Portal>
        <Dialog visible={visible2} onDismiss={hideDialog2}>
          <Dialog.Title>Atención!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Si elimina su cuenta no podrá recuperarla. ¿Desea continuar?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteAccount}>Confirmar</Button>
            <Button onPress={hideDialog2}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

  </View>);
}

const styles = StyleSheet.create({
  button:{
      margin: 10, 
      borderWidth:0
  },
  body:{
    margin: 5
  },
  container:{
    margin: 10
  },
  fecha: {
    flexDirection: "row"
  },    
  picker:{
    //color: '#fff',
    fontWeight:'bold',
    width: 200,
    marginLeft: 0,
    marginRight:0,
    //alignItems: 'center',
    
  },
  pickerContainer:{
    flexDirection:'row',
    alignItems: 'center'
  },
  cont:{
    flex:1,
    //alignItems:'center'
  },
  
});


export {EditarPerfil};