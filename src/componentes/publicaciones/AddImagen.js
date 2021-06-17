import React, {useContext} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import { FlatList } from 'react-native';    
import { maximos } from '../../config/maximos';

const AddImagen = () => {

    const {state:{currentPublicacion, imagenes }, agregarImagen, cancelarImagen, borrarImagen } = useContext(PublicacionContext);

    const OpenGalleryAsync = async () => {
        const PermissionGallery =  await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (PermissionGallery.granted === false){
                alert('Permiso denegado');
            return;    }
        const result = await ImagePicker.launchImageLibraryAsync().then((data) => {
            return data
        });
        if (!result.cancelled){
            agregarImagen({id: 0, uri: result.uri, type: result.type, width: result.width, height: result.height});
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
            agregarImagen({id: 0, uri: result.uri, type: result.type, width: result.width, height: result.height});
        }
    }

    // const _rotate90 = async () => {
    //     const manipResult = await ImageManipulator.manipulateAsync(
    //         imageU,
    //         [{ rotate: 90 }],
    //         { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    //     ).then((data) => {
    //         return data
    //     });
    //     agregarImagen({uri: manipResult.uri, type: manipResult.type, width: manipResult.width, height: manipResult.height});
    // }

    // const _rotate270 = async () => {
    //     const manipResult = await ImageManipulator.manipulateAsync(
    //         imageU,
    //         [{ rotate: 270 }],
    //         { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    //     ).then((data) => {
    //         return data
    //     });
    //     agregarImagen({uri: manipResult.uri, type: manipResult.type, width: manipResult.width, height: manipResult.height});
    // }
    //   
    // const _flipV = async () => {
    //     const manipResult = await ImageManipulator.manipulateAsync(
    //         imageU,
    //         [{ flip: ImageManipulator.FlipType.Vertical }],
    //         { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    //     ).then((data) => {
    //         return data
    //     });
    //     agregarImagen({uri: manipResult.uri, type: manipResult.type, width: manipResult.width, height: manipResult.height});
    // }

    // const _flipH = async () => {
    //     const manipResult = await ImageManipulator.manipulateAsync(
    //         imageU,
    //         [{ flip: ImageManipulator.FlipType.Horizontal }],
    //         { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    //     ).then((data) => {
    //         return data
    //     });
    //     agregarImagen({uri: manipResult.uri, type: manipResult.type, width: manipResult.width, height: manipResult.height});
    // }

    return (
        <View style={styles.main}>
            <View style={styles.main2}>
                {imagenes.length < maximos._imagen ?
                    <View style = { styles.horizontalView }>
                        <Text style = {styles.buttonText} >Seleccionar imagen:</Text>
                        <Text style = {styles.buttonText} onPress = {() => OpenGalleryAsync()}>Galeria</Text>
                        <Text style = {styles.buttonText} onPress = {() => OpenCameraAsync()}>Camara</Text>
                    </View>
                    :
                    null
                }
                <View>
                    <View>
                        {
                        console.log("imagenes", imagenes)
                        }
                        <FlatList
                            data={imagenes}
                            keyExtractor={item=>item.uri}
                            renderItem={({item})=>(
                                <View>
                                    <Image source = {{ uri: item.uri}} style={{ width: item.width/2, height: item.height/2}}/>
                                    {currentPublicacion.id ?
                                        <Text style = {styles.buttonText} onPress={()=>borrarImagen(currentPublicacion.id, item.id)}>Borrar</Text>
                                        :
                                        <Text style = {styles.buttonText} onPress={()=>cancelarImagen(item.uri)}>Cancelar</Text>
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
    }
});

export default AddImagen;