import React, {useContext} from 'react';
import {StyleSheet, View, Text, TextInput, Linking } from 'react-native';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import { FlatList } from 'react-native';    
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';
import { maximos } from '../../config/maximos';

const AddEnlace = () => {

    const {state:{currentPublicacion, enlace, enlaces }, cambiarValor, agregarEnlace, cancelarEnlace } = useContext(PublicacionContext);
    
    const _agregarEnlaceDesdePreview = async (url) => {
        const data = await getLinkPreview(url);
        console.log(data)
        var descripcion = ""
        if(data.description !== undefined)
        {
            descripcion = data.description
        }

        var imagen_url = "";
        if(data.images.length > 0)
        {
            imagen_url = data.images[0];
        }
                                
        var enlaceObj = {url: url, titulo: data.title, descripcion: descripcion, imagen_url: imagen_url}
        console.log("enlace", enlaceObj)
        agregarEnlace(enlaceObj)
    }

    const _abrirEnlace = async (url) => {
        // Abrir en navegador
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    }

    


    return (
        <View style={styles.main}>
            <View style={styles.main2}>
                {enlaces.length < maximos._enlaces ?
                    <View style = { styles.horizontalView }>
                        {currentPublicacion.id ?
                            null
                            :
                            <TextInput
                                label={"Enlace"}
                                value={enlace}
                                style = {styles.imputText}
                                onChangeText={text => cambiarValor({variable: 'enlace', valor: text})}
                            />
                        }
                        { enlace ?
                                <Text style = {styles.buttonText} onPress = {() =>_agregarEnlaceDesdePreview(enlace)}>Guardar enlace</Text>
                            :
                            null
                        }
                            
                    </View>
                    :
                    null
                }
                <View>
                    <View>
                        <FlatList
                            data={enlaces}
                            keyExtractor={item=>item.url}
                            renderItem={({item})=>(
                                <View>
                                    <Text style = {styles.linkText} onPress={()=>_abrirEnlace(item.url)}>{ item.url }</Text> 
                                    {currentPublicacion.id? 
                                        null
                                        :
                                        <Text style = {styles.buttonText} onPress={()=>cancelarEnlace(item.url)}>Cancelar</Text>
                                    }
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
    imputText: {
        margin : 8,
        borderWidth: 1,
    },
    linkText: {
        margin : 8,
        color: 'blue',
    }
});

export default AddEnlace;