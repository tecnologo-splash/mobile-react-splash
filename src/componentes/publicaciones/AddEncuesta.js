import React, {useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {TextInput} from 'react-native-paper'
import {Context as PublicacionContext} from '../../context/PublicacionContext';
import { FlatList } from 'react-native';    
import { maximos } from '../../config/maximos';
import {Picker} from '@react-native-picker/picker';

const AddEncuesta = () => {

    const {state:{currentPublicacion, duracion, unidad, opcion, opciones }, cambiarValor, agregarOpcion, cancelarOpcion } = useContext(PublicacionContext);
    
    return (
        <View style={styles.main}>
            <View style={styles.main2}>
                {currentPublicacion.encuesta ?
                    <Text>Finaliza el: {currentPublicacion.encuesta.fecha_cierre}</Text>
                    :
                    <View>
                        <TextInput
                            label="Duracion"
                            value={duracion}
                            style = {styles.imputText}
                            onChangeText={text => cambiarValor({variable: 'duracion', valor: text})}
                        />
                        <Picker
                            selectedValue={unidad}
                            onValueChange={(itemValue, itemIndex) =>
                                cambiarValor({variable: 'unidad', valor: itemValue})
                            }>
                            <Picker.Item label="HOURS" value="HOURS"/>
                        </Picker>
                    </View>
                }
                {opciones.length < maximos._opciones ?
                    <View>
                        {currentPublicacion.id ?
                            null
                            :
                            <TextInput
                                label="Opción"
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