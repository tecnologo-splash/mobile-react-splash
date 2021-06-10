import React, {useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Image, StyleSheet, Text } from 'react-native';
import { Card} from 'react-native-paper';
import { colores } from '../../config/colores';
import { tipoMultimedia } from '../../config/tiposPublicacion';
import { Video } from 'expo-av';
import BotonesPublicacion from './BotonesPublicacion';

const Publicacion = ({publicacion, usuario}) => {
    const [dots, setDots] = useState(0);

    const renderItem = (item)=>{
        if(item.tipo===tipoMultimedia._foto){
            console.log('imagen',`https://splash.s3.amazonaws.com/api/files/${item.url}`);
            return <Image source={{uri: `https://splash.s3.amazonaws.com/api/files/${item.url}`}} style={{height: 300}}/>;
        }
        else if (item.tipo===tipoMultimedia._video){
            var vid = `https://splash.s3.amazonaws.com/api/files/${item.url}`;
            console.log(vid);
            return <Video 
            source={{uri: vid}} 
            style={styles.backgroundVideo}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            isLooping
            useNativeControls
            />;
        }
        else{
            console.log("else");
            return null;
        }
    }

  return (
    <Card style={{margin: 10}}>
    <Card.Title
    title={usuario.usuario}
    subtitle={`${usuario.nombre} ${usuario.apellido}`}
    left={(props)=>
      <Image {...props} style={{height: 50, width: 50, borderRadius: 50}} source={usuario.url_perfil ? {uri: usuario.url_perfil}:require("../../../assets/perfilDefault.jpg")}/>
    }
    />
    <Card.Content style={styles.text}>
          <Text>{publicacion.texto}</Text>
    </Card.Content>
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
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </Card.Content>:null}
        <BotonesPublicacion publicacion={publicacion}/>
  </Card>
  );
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