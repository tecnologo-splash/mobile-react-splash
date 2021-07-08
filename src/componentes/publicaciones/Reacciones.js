import React, {useContext} from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { colores } from '../../config/colores';
import { tiposReacciones } from '../../config/configs';
import {Context as PublicacionContext} from '../../context/PublicacionContext';

const Reacciones = ({setIndex, publicacionId, miReaccion}) => {
    const {reaccionarPublicacion,eliminarReaccion} = useContext(PublicacionContext);
    const reaccionar = async (id)=>{
        var [r] = tiposReacciones.filter(item=> item.id===id);
        if(miReaccion){
            await eliminarReaccion({publicacionId: publicacionId})
        }
        await reaccionarPublicacion({publicacionId: publicacionId, tipoReaccion: r.tipo});
        setIndex(id);
        
    }
    return (
        <View style={styles.card}>
            {tiposReacciones.map((reaccion)=>(
                <TouchableOpacity onPress={()=>reaccionar(reaccion.id)} style={styles.touchable}>
                    <Image source={reaccion.icono} style={styles.image}/>
                </TouchableOpacity>
            ))}
        </View>
    );
  
}

const styles = StyleSheet.create({
    image:{
        height: 20,
        width: 20
    },
    touchable: {
        margin: 5,
        flexDirection: 'row'
    },
    card:{
        alignItems:'center',
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-around',
    }
});

export default Reacciones;