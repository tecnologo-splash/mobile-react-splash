import React, { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {StyleSheet, Image, View, Text } from 'react-native';
import { Button, Portal, Dialog, Paragraph  } from 'react-native-paper';
import settings from '../config/settings';
import {Context as PerfilContext} from '../context/PerfilContext';
import { useNavigation } from '@react-navigation/native';

export function EditFotoPerfil() {
  const [image, setImage] = useState(undefined);
  const {state:{currentUser}, getInfo} = useContext(PerfilContext)

  const OpenGalleryAsync = async () => {
    const PermissionGallery =  await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (PermissionGallery.granted === false){
      alert('Permiso denegado');
      return;    
    }
    const result = await ImagePicker.launchImageLibraryAsync().then((data) => {
        return data
    });
    if (!result.cancelled){
        setImage({uri: result.uri, type: result.type, width: result.width, height: result.height});
    }
  }

  const OpenCameraAsync = async () => {
    const PermissionCamera =  await ImagePicker.requestCameraPermissionsAsync();
    if (PermissionCamera.granted === false){
      alert('Permiso denegado');
      return;
    }
    const result = await ImagePicker.launchCameraAsync().then((data) => {
        return data
    });
    if (!result.cancelled){
        setImage({uri: result.uri, type: result.type, width: result.width, height: result.height});
    }
  }

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const navigation = useNavigation();
  const EditarFoto = () => {
    
    var file = {
      uri: image.uri,
      type: image.type + '/' + image.uri.split('.').pop(),
      name: 'perfil_'+ currentUser.id + '.' + image.uri.split('.').pop()
    }
    var formData = new FormData();
    formData.append("fotoDePerfil", file);

    
    settings.put(`/users/${currentUser.id}`,formData).then((response) => {
      if(response.status===200){
        getInfo()
        navigation.goBack()
      } else {
        showDialog();
      }
    })
  }


  return (
      <View style={styles.main}>
        <View style={styles.main2}>
            <View style = { styles.horizontalView }>
                <Text style = {styles.buttonText} >Seleccionar imagen:</Text>
                <Text style = {styles.buttonText} onPress = {() => OpenGalleryAsync()}>Galeria</Text>
                <Text style = {styles.buttonText} onPress = {() => OpenCameraAsync()}>Camara</Text>
            </View>
        
            <View>
                <View style={styles.container}>
                  { image && 
                    <>
                      <Image source={{ uri: image.uri}} style={{ width: "85%", height:"85%"}}/>
                      <Button style = {styles.buttonText} icon="camera" mode="contained" onPress={() => EditarFoto()}>
                        Actualizar foto de Perfil
                      </Button>
                    </>
                  }
                </View>
            </View>
        </View> 

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Atención!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Error al actualizar la imagen de perfil. Vuelva a intentar.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
  );
}


const styles = StyleSheet.create({
  main2:{
      flex:1,
      flexDirection:'column'
  },
  main:{
      flexDirection:'row',
      flex:1,
      alignItems:'center',
      marginLeft: 5,
      marginRight:5
  },
  containerView: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  horizontalView: {
      flexDirection: 'row',
  },
  buttonText: {
      margin : 8,
  },
  container:{
    alignItems:'center'
  }
});