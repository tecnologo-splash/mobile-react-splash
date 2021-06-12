import React, {useContext} from 'react';
import {StyleSheet, View, Text, TextInput } from 'react-native';
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import { FlatList } from 'react-native';    
import { maximos } from '../../config/maximos';

const AddEncuesta = () => {

    const {state:{currentPublicacion, opcion, opciones }, cambiarValor, agregarOpcion, cancelarOpcion } = useContext(PublicacionContext);
    
    return (
        <View style={styles.main}>
            <View style={styles.main2}>
                {opciones.length < maximos._opciones ?
                    <View style = { styles.horizontalView }>
                        {currentPublicacion.id ?
                            null
                            :
                            <TextInput
                                label={"Opción"}
                                value={opcion}
                                style = {styles.imputText}
                                onChangeText={text => cambiarValor({variable: 'opcion', valor: text})}
                            />
                        }
                        { opcion ?
                                <Text style = {styles.buttonText} onPress = {() =>agregarOpcion({texto: opcion})}>Guardar opción</Text>
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
                            data={opciones}
                            keyExtractor={item=>item.texto}
                            renderItem={({item})=>(
                                <View>
                                    <Text>{ item.texto }</Text> 
                                    {currentPublicacion.id? 
                                        null
                                        :
                                        <Text style = {styles.buttonText} onPress={()=>cancelarOpcion(item.texto)}>Cancelar</Text>
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
    buttonText: {
        margin : 8,
    }
});

export default AddEncuesta;