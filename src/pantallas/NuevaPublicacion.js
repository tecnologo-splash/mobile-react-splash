    import React, {useContext, useState} from 'react';
    import NavBar from '../componentes/muro/NavBar';
    import { View, Text, StyleSheet } from 'react-native';
    import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
    import {Context as PublicacionContext} from '../context/PublicacionContext';
    import AddImagen from '../componentes/publicaciones/AddImagen';
    import AddVideo from '../componentes/publicaciones/AddVideo';
    import { ScrollView } from 'react-native';

    const NuevaPublicacion = () => {

      const {state:{currentPublicacion, texto, imagenes, videos }, cambiarValor, crearPublicacion, editarPublicacion, eliminarPublicacion } = useContext(PublicacionContext);
      const [video, setVideo] = useState(false);

      const crear = () => {
        if ( texto === null || texto === ''){
          console.log("error vacio")
        } 
        else{
          var formData = { texto }
          if (video){
            crearPublicacion(formData, videos); 
          }else{
            crearPublicacion(formData, imagenes); 
          }
        }
      }

      const editar = () => {
        if ( texto === null || texto === ''){
          console.log("error vacio")
        } 
        else{
          var formData = { texto }
          editarPublicacion(currentPublicacion.id, formData);
        }
      }

      const eliminar = () => {
        eliminarPublicacion(currentPublicacion.id);
      }

      const [visible, setVisible] = useState(false);
      const showDialog = () => setVisible(true);
      const hideDialog = () => setVisible(false);

      return (
      <View style={styles.body}>
          <ScrollView style={styles.container}>
            <TextInput
              label={currentPublicacion.texto ? currentPublicacion.texto : "Publicación"}
              value={texto}
              onChangeText={text => cambiarValor({variable: 'texto', valor: text})}
            />
            <View style = { styles.horizontalView }>
            <Button 
              mode={video? "outlined":"contained"} 
              onPress={()=>setVideo(false)}
              style={styles.button}
              >
                  Imagen
              </Button>
              <Button 
              mode={video? "contained":"outlined"} 
              onPress={()=>setVideo(true)}
              style={styles.button}
              >
                  Video
              </Button>
            </View>
            { video ?
              <AddVideo />
              :
              <AddImagen />
            }
          </ScrollView>
          {currentPublicacion.id ?
            <Button
              style={styles.button}
              onPress={()=>editar()}
              mode="contained"> 
                Editar Publicación
            </Button>
          :
            <Button
              style={styles.button}
              onPress={()=>crear()}
              mode="contained"> 
                Crear Publicación
            </Button>
          }
          {currentPublicacion.id ?
            <Button
              style={styles.button}
              onPress={()=>eliminar()}
              mode="outlined"
              color="red"> 
                Eliminar Publicación
            </Button>
          :
            null
          }

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>This is simple dialog</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
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
      horizontalView: {
          flexDirection: 'row',
      },
      button:{
        margin:5,
        borderWidth:0,
        borderRadius:20
      }
  });

  export {NuevaPublicacion};