import React, {useContext, useState, useRef } from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import { FlatList } from 'react-native';    
import { maximos } from '../../config/maximos';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { colores } from '../../config/colores';

const AddMultimedia = () => {
    const {state:{currentPublicacion, multimedias }, agregarMultimedia, cancelarMultimedia, borrarMultimedia } = useContext(PublicacionContext);
    
    const video = useRef(null);
    const [ status, setStatus ] = useState();
    const [mediaTypes, setMediaTypes] = useState(null);

    const OpenGalleryAsync = async () => {
        const PermissionGallery =  await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (PermissionGallery.granted === false){
                alert('Permiso denegado');
            return;    }
        const result = await ImagePicker.launchImageLibraryAsync({mediaTypes}).then((data) => {
            return data
        });
        if (!result.cancelled){
            agregarMultimedia({id: 0, tipo: mediaTypes, uri: result.uri, type: result.type, width: result.width, height: result.height});
        }
    }

    const OpenCameraAsync = async () => {
        const PermissionCamera =  await ImagePicker.requestCameraPermissionsAsync();
        if (PermissionCamera.granted === false){
            alert('Permiso denegado');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({mediaTypes}).then((data) => {
            return data
        });
        if (!result.cancelled){
            agregarMultimedia({id: 0, tipo: mediaTypes, uri: result.uri, type: result.type, width: result.width, height: result.height});
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.main2}>
                {multimedias.length < maximos._multimedia ?
                    <View style = { styles.horizontalView }>
                        <Button 
                        mode={mediaTypes==="Images"? "contained":"outlined"} 
                        onPress={()=>setMediaTypes('Images')}
                        style={styles.button}
                        >
                            Imagen
                        </Button>
                        <Button 
                        mode={mediaTypes==="Videos"? "contained":"outlined"} 
                        onPress={()=>setMediaTypes("Videos")}
                        style={styles.button}
                        >
                            Video
                        </Button>
                        {mediaTypes==null? null: 
                        <>
                            <Feather name="paperclip" style = {styles.buttonText} size={24} color={colores.appDefault} onPress = {() => OpenGalleryAsync()}/>
                            <Text style = {styles.buttonText} onPress = {() => OpenGalleryAsync()}>Galeria</Text>
                            <Entypo name="camera" style = {styles.buttonText} size={24} color={colores.appDefault} onPress = {() => OpenCameraAsync()}/>
                            <Text style = {styles.buttonText} onPress = {() => OpenCameraAsync()}>Camara</Text>
                        </>
                        }
                        
                    </View>
                    :
                    null
                }
                <View>
                    <View>
                        <FlatList
                            data={multimedias}
                            keyExtractor={item=>item.uri}
                            renderItem={({item})=>(
                                <View>
                                    {item.tipo === "Videos"?
                                        <Video
                                        ref={video}
                                        style={{ width: item.width/2, height: item.height/2 }}
                                        source={{ uri: item.uri }}
                                        useNativeControls
                                        resizeMode="contain"
                                        isLooping
                                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                                        />
                                        :
                                        <Image source = {{ uri: item.uri}} style={{ width: item.width/2, height: item.height/2}}/>
                                    }
                                    {currentPublicacion.id ?
                                        <>
                                        {console.log(item)}
                                        <Text style = {styles.buttonText} onPress={()=>borrarMultimedia(currentPublicacion.id, item.id)}>Borrar</Text>
                                        </>
                                        :
                                        <Text style = {styles.buttonText} onPress={()=>cancelarMultimedia(item.uri)}>Cancelar</Text>
                                    }
                                    {/*<Text style = {styles.buttonText} onPress={_rotate90}>90º</Text>
                                    <Text style = {styles.buttonText} onPress={_rotate270}>270º</Text>
                                    <Text style = {styles.buttonText} onPress={_flipH}>Flip V.</Text>
                                    <Text style = {styles.buttonText} onPress={_flipV}>Flip H.</Text>*/}
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
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
    button:{
        margin:5,
        borderWidth:0,
        borderRadius:20
      }
});

export default AddMultimedia;