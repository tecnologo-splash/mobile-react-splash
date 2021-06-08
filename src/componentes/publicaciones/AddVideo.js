import React, {useContext, useState, useRef } from 'react';
import {StyleSheet, Image, View, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import { FlatList } from 'react-native';    
import { maximos } from '../../config/maximos';

const AddVideo = () => {
    const {state:{ videos }, cambiarValor, agregarVideo, cancelarVideo } = useContext(PublicacionContext);

    const video = useRef(null);
    const [ status, setStatus ] = useState();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const OpenGalleryAsync = async () => {
        const PermissionGallery =  await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (PermissionGallery.granted === false){
                alert('Permiso denegado');
            return;    }
        const result = await ImagePicker.launchImageLibraryAsync({mediaTypes:'Videos'}).then((data) => {
            return data
        });
        if (!result.cancelled){
            agregarVideo({uri: result.uri, type: result.type, width: result.width, height: result.height});
        }
    }

    const OpenCameraAsync = async () => {
        const PermissionCamera =  await ImagePicker.requestCameraPermissionsAsync();
        if (PermissionCamera.granted === false){
            alert('Permiso denegado');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({mediaTypes:'Videos'}).then((data) => {
            return data
        });
        if (!result.cancelled){
            agregarVideo({uri: result.uri, type: result.type, width: result.width, height: result.height});
        }
    }
    
    return (
        <View style={styles.main}>
            <View style={styles.main2}>
                {videos.length < maximos._video ?
                    <View style = { styles.horizontalView }>
                        <Text style = {styles.buttonText} >Seleccionar video:</Text>
                        <Text style = {styles.buttonText} onPress = {() => OpenGalleryAsync()}>Galeria</Text>
                        <Text style = {styles.buttonText} onPress = {() => OpenCameraAsync()}>Camara</Text>
                    </View>
                    :
                    null
                }
                <View>
                    <View>
                        <FlatList
                            data={videos}
                            keyExtractor={item=>item.uri}
                            renderItem={({item})=>(
                                <View>
                                    <Video
                                        ref={video}
                                        style={{ width: item.width/2, height: item.height/2 }}
                                        source={{ uri: item.uri }}
                                        useNativeControls
                                        resizeMode="contain"
                                        isLooping
                                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                                    />
                                    <View style = { styles.horizontalView }>
                                        <Text style = {styles.buttonText} onPress={()=>cancelarVideo(item.uri)}>Cancelar</Text>
                                    </View>
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
    }
});

export default AddVideo;