import React, {useState, useContext} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card} from 'react-native-paper';
import { colores } from '../../config/colores';
import { tipoMultimedia } from '../../config/tiposPublicacion';
import { Video } from 'expo-av';
import BotonesPublicacion from './BotonesPublicacion';
import { baseUriMultimedia } from '../../config/configs';
import Encuesta from './Encuesta';
import EnlaceExterno from './EnlaceExterno';
import { EvilIcons } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/native';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import {Context as PerfilContext} from '../../context/PerfilContext';

const Publicacion = ({publicacion}) => {
    const [dots, setDots] = useState(0);
    const usuario = publicacion.usuario_comun;
    const navigation = useNavigation();
    const {setCurrentPublicacion}= useContext(PublicacionContext);
    const {state:{currentUser}} = useContext(PerfilContext);
    const renderItem = (item)=>{
      if(item.tipo===tipoMultimedia._foto){
          return <Image source={{uri: `${baseUriMultimedia}${item.url}`}} style={{height: 300}}/>;
      }
      else if (item.tipo===tipoMultimedia._video){
          var vid = `${baseUriMultimedia}${item.url}`;
          return <Video 
          source={{uri: vid}} 
          style={styles.backgroundVideo}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          useNativeControls
          />;
      }
      else{
          return null;
      }
  }

  const editar = ()=> {
      setCurrentPublicacion({ currentPublicacion: publicacion });
      navigation.navigate("NuevaPublicacion");
  }

  const renderHeader = ()=> {
    if(usuario.id === currentUser.id){
        return (
          <Card.Title
          title={usuario.usuario}
          subtitle={`${usuario.nombre} ${usuario.apellido}`}
          left={(props)=>
            <Image {...props} style={{height: 50, width: 50, borderRadius: 50}} source={usuario.url_perfil ? {uri: `${baseUriMultimedia}${usuario.url_perfil}`}:require("../../../assets/perfilDefault.jpg")}/>
          }
          right={()=><EvilIcons name="pencil" size={24} color="black" onPress={()=>editar()}/>}
          />
        );
    }
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('PerfilExterno',{usuarioId:usuario.id})}>
      <Card.Title
        title={usuario.usuario}
        subtitle={`${usuario.nombre} ${usuario.apellido}`}
        left={(props)=>
          <Image {...props} style={{height: 50, width: 50, borderRadius: 50}} source={usuario.url_perfil ? {uri: `${baseUriMultimedia}${usuario.url_perfil}`}:require("../../../assets/perfilDefault.jpg")}/>
        }
        />
      </TouchableOpacity>
    )
  }

  if(publicacion && usuario){
    return (
      <Card style={{margin: 10}}>
      {renderHeader()}
      <Card.Content style={styles.text}>
            <Text>{publicacion.texto}</Text>
      </Card.Content>
      {publicacion.enlace_externo.length > 0 ?
        publicacion.enlace_externo.map(enlace=>(<EnlaceExterno enlace={enlace}/>))
        :
        null
      }
      {publicacion.multimedia.length != 0 ?
          <Card.Content style={styles.content}>
            <Carousel
            layout='stack'
            data={publicacion.multimedia}
            renderItem={({item})=> renderItem(item)}
            sliderWidth={300}
            itemWidth={300}
            onSnapToItem={(index)=> setDots(index)}
            />
            <Pagination
              dotsLength={publicacion.multimedia.length}
              activeDotIndex={dots}
              containerStyle={{ backgroundColor: colores.blanco }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: colores.appDefault
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </Card.Content>:
          
          publicacion.encuesta?
              <Encuesta 
              encuesta={publicacion.encuesta} 
              publicacionId={publicacion.id} 
              usuarioId={usuario.id}/>:
          null
        }
          <View style={styles.fechaContainer} >
            <Text style={styles.fecha}>{publicacion.fecha_creado}</Text>
          </View>
          <BotonesPublicacion publicacion={publicacion}/>
    </Card>
    );
  }else{
    return null;
  }
}

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'relative',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width:300,
      height:300
    },
    fechaContainer:{
      alignItems:'flex-end',
      margin:10
    },
    fecha:{
        color: colores.gris,
        fontSize: 11
    },
    text:{
      margin:10
    },
    content:{
        alignItems: 'center',
        marginTop:10,
        marginBottom:10
    }
  });

export default Publicacion;