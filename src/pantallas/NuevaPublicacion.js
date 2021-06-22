    import React, {useContext, useState, useEffect} from 'react';
    import NavBar from '../componentes/muro/NavBar';
    import { Alert, View, Text, StyleSheet } from 'react-native';
    import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
    import {Context as PublicacionContext} from '../context/PublicacionContext';
    import AddMultimedia from '../componentes/publicaciones/AddMultimedia';
    import AddVideo from '../componentes/publicaciones/AddVideo';
    import AddEnlace from '../componentes/publicaciones/AddEnlace';
    import AddEncuesta from '../componentes/publicaciones/AddEncuesta';
    import { ScrollView } from 'react-native';

    const NuevaPublicacion = () => {

      const {state:{currentPublicacion, tipoPub, texto, duracion, unidad, multimedias, enlaces, opciones}, cambiarValor, crearPublicacion, editarPublicacion, eliminarPublicacion } = useContext(PublicacionContext);
      const [tipo, setTipo] = useState(0);

      // useEffect (()=>{
      //   console.log("UseEffect1", tipo)
      //   setTipo(0)
      //   if (opciones.length > 0){
      //     setTipo(4);
      //   } else if (enlaces.length > 0){
      //     setTipo(3);
      //   } else if (multimedias.length > 0){
      //       setTipo(1)
      //   }else{
      //     setTipo(0)
      //   }
      //   console.log("UseEffect", tipo)
      // },[currentPublicacion])

      const crear = () => {
        if ( texto === null || texto === ''){
          mostrarAlerta("Error", "La publicación no puede ser vacia")
        } 
        else
        {
          console.log('crea publicacion',tipoPub)
          switch (tipoPub) {
            case 1:
              var formData = { texto }
              crearPublicacion(formData, multimedias);
              break;
            case 2:
              var formData = { texto }
              crearPublicacion(formData, videos);
              break;
            case 3:
              if ( enlaces.length == 0 )
              {
                mostrarAlerta("Error", "La publicación no tiene enlaces ingresados")
              }
              else
              {
                var formData = { texto, enlaces_externos: enlaces }
                crearPublicacion(formData, []);
              }
              break;
            case 4:
              if ( duracion === 0 )
              {
                mostrarAlerta("Error", "La encuesta no puede tener duración 0")
              }
              else
              {
                if ( opciones.length < 2 )
                {
                  mostrarAlerta("Error", "La encuesta no tiene el minimo de dos opciones")
                }
                else
                {
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
        }
      }

      const mostrarAlerta = (titulo, descripcion) =>
        Alert.alert(titulo, descripcion, [{ text: "OK"}]);

      const editar = () => {
        if ( texto === null || texto === ''){
          mostrarAlerta("Error", "La publicación no puede ser vacia")
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
      <View style={styles.body}>
          <ScrollView style={styles.container}>
            <TextInput
              label={currentPublicacion.texto ? currentPublicacion.texto : "Publicación"}
              value={texto}
              onChangeText={text => cambiarValor({variable: 'texto', valor: text})}
            />
            <View style = { styles.horizontalView }>
            {/* {currentPublicacion.id ?
              null
            : */}
              <>
                <Button 
                mode={tipoPub===1? "contained":"outlined"} 
                onPress={()=>cambiarValor({variable: 'tipoPub', valor: 1})}
                style={styles.button}
                >
                    Imagen/Video
                </Button>
                <Button 
                mode={tipoPub===3? "contained":"outlined"} 
                onPress={()=>cambiarValor({variable: 'tipoPub', valor: 3})}
                style={styles.button}
                >
                    Enlace
                </Button>
                <Button 
                mode={tipoPub===4? "contained":"outlined"} 
                onPress={()=>cambiarValor({variable: 'tipoPub', valor: 4})}
                style={styles.button}
                >
                    Encuesta
                </Button>
              </>
            {/* } */}
            </View>
            { definoTipo()}
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