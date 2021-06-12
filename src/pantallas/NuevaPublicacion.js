    import React, {useContext, useState} from 'react';
    import NavBar from '../componentes/muro/NavBar';
    import { View, Text, StyleSheet } from 'react-native';
    import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
    import {Context as PublicacionContext} from '../context/PublicacionContext';
    import AddImagen from '../componentes/publicaciones/AddImagen';
    import AddVideo from '../componentes/publicaciones/AddVideo';
    import AddEnlace from '../componentes/publicaciones/AddEnlace';
    import AddEncuesta from '../componentes/publicaciones/AddEncuesta';
    import { ScrollView } from 'react-native';

    const NuevaPublicacion = () => {

      const {state:{currentPublicacion, texto, imagenes, videos , enlaces, opciones}, cambiarValor, crearPublicacion, editarPublicacion, eliminarPublicacion } = useContext(PublicacionContext);
      const [tipo, setTipo] = useState(0);

      const crear = () => {
        if ( texto === null || texto === ''){
          console.log("error vacio")
        } 
        else{
          console.log(tipo)
          switch (tipo) {
            case 1:
              var formData = { texto }
              crearPublicacion(formData, imagenes);
              break;
            case 2:
              var formData = { texto }
              crearPublicacion(formData, videos);
              break;
            case 3:
              var formData = { texto, enlaces }
              crearPublicacion(formData, videos);
              break;
            case 4:
              var encuesta = { duracion: 10, unidad: "HOURS", opciones}
              var formData = { texto, encuesta }
              crearPublicacion(formData, []);
              break;
            default:
              null
              break;
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
              mode={tipo===1? "contained":"outlined"} 
              onPress={()=>setTipo(1)}
              style={styles.button}
              >
                  Imagen
              </Button>
              <Button 
              mode={tipo===2? "contained":"outlined"} 
              onPress={()=>setTipo(2)}
              style={styles.button}
              >
                  Video
              </Button>
              <Button 
              mode={tipo===3? "contained":"outlined"} 
              onPress={()=>setTipo(3)}
              style={styles.button}
              >
                  Enlace
              </Button>
              <Button 
              mode={tipo===4? "contained":"outlined"} 
              onPress={()=>setTipo(4)}
              style={styles.button}
              >
                  Encuesta
              </Button>
            </View>
            { tipo===1 ?
              <AddImagen />
              : tipo===2 ?
                <AddVideo />
                : tipo===3 ?
                  <AddEnlace />
                  : tipo===4 ?
                    <AddEncuesta />
                    : null
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