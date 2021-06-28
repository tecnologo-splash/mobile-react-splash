    import React, {useContext, useState, useEffect} from 'react';
    import { Alert, View, Text, StyleSheet } from 'react-native';
    import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
    import {Context as PublicacionContext} from '../context/PublicacionContext';
    import AddMultimedia from '../componentes/publicaciones/AddMultimedia';
    import AddEnlace from '../componentes/publicaciones/AddEnlace';
    import AddEncuesta from '../componentes/publicaciones/AddEncuesta';
    import { ScrollView } from 'react-native';
    import NavBar from '../componentes/muro/NavBar';

    const NuevaPublicacion = ({navigation}) => {

      const {state:{currentPublicacion, tipoPub, texto, duracion, unidad, multimedias, enlaces, opciones}, cambiarValor, crearPublicacion, editarPublicacion, eliminarPublicacion } = useContext(PublicacionContext);

      const crear = () => {
        if ( texto === null || texto === ''){
          mostrarAlerta("Error", "La publicación no puede ser vacia")
        }else{
          switch (tipoPub) {
            case 1:
              var formData = { texto }
              if(multimedias.length = 0){
                mostrarAlerta("Error", "La publicación no tiene archivos multimedia ingresados")
              }else{
                crearPublicacion(formData, multimedias);
              }
              break;
            case 3:
              if ( enlaces.length == 0 ){
                mostrarAlerta("Error", "La publicación no tiene enlaces ingresados")
              }else{
                var formData = { texto, enlaces_externos: enlaces }
                crearPublicacion(formData, []);
              }
              break;
            case 4:
              if ( duracion === 0 ){
                mostrarAlerta("Error", "La encuesta no puede tener duración 0")
              }else{
                if ( opciones.length < 2 ){
                  mostrarAlerta("Error", "La encuesta no tiene el minimo de dos opciones")
                }else{
                  var encuesta = { duracion, unidad, opciones}
                  var formData = { texto, encuesta }
                  crearPublicacion(formData, []);
                }
              }
              break;
            default:
              null
              break;
          }
          navigation.navigate("Muro");
        }
      }

      const mostrarAlerta = (titulo, descripcion) =>{
        Alert.alert(titulo, descripcion, [{ text: "OK"}]);
      }

      const editar = () => {
        if ( texto === null || texto === ''){
          mostrarAlerta("Error", "La publicación no puede ser vacia")
        }else{
          var formData = { texto }
          editarPublicacion(currentPublicacion.id, formData, multimedias);
        }
      }

      const eliminar = () => {
        eliminarPublicacion(currentPublicacion.id);
      }

      const definoTipo = () =>{
        console.log("defino tipo ", tipoPub)
        switch (tipoPub) {
          case 1:
            return <AddMultimedia />;
          case 3:
            return <AddEnlace />;
          case 4:
            return <AddEncuesta />;
          default:
            return null
        }
      }

      return (
      <View style={{ paddingBottom: 160}}>
          <NavBar buscador={false} tituloNavBar={'Nueva publicación'}/>
          <ScrollView style={styles.container}>
            <TextInput
              label={currentPublicacion.texto ? currentPublicacion.texto : "Publicación"}
              value={texto}
              onChangeText={text => cambiarValor({variable: 'texto', valor: text})}
            />
            <View style = { styles.horizontalView }>
              <>
                <Button 
                mode={tipoPub===1? "contained":"outlined"} 
                onPress={!currentPublicacion.id?()=>cambiarValor({variable: 'tipoPub', valor: 1}):null}
                style={styles.button}
                >
                    Imagen/Video
                </Button>
                <Button 
                mode={tipoPub===3? "contained":"outlined"} 
                onPress={!currentPublicacion.id?()=>cambiarValor({variable: 'tipoPub', valor: 3}):null}
                style={styles.button}
                >
                    Enlace
                </Button>
                <Button 
                mode={tipoPub===4? "contained":"outlined"} 
                onPress={!currentPublicacion.id?()=>cambiarValor({variable: 'tipoPub', valor: 4}):null}
                style={styles.button}
                >
                    Encuesta
                </Button>
              </>
            </View>
            { definoTipo()}
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
          </ScrollView>
      </View>);
    }

    const styles = StyleSheet.create({
      button:{
        margin: 10, 
        borderWidth:0,
        paddingBottom: 160
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