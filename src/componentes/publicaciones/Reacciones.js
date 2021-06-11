import React, {useContext} from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { tiposReacciones } from '../../config/configs';
import {Context as PublicacionContext} from '../../context/PublicacionContext';

const Reacciones = ({setIndex, publicacionId}) => {
    const {reaccionarPublicacion, eliminarReaccion} = useContext(PublicacionContext);
    const reaccionar = (id)=>{
        console.log("publicacionId", publicacionId);
        var [r] = tiposReacciones.filter(item=> item.id===id);
        if(r.tipo!="ELIMINAR"){
            reaccionarPublicacion({publicacionId: publicacionId, tipoReaccion: r.tipo});
            setIndex(id);
        }else{
            eliminarReaccion({publicacionId: publicacionId})
        }
        
    }
    return (
        <View style={styles.card}>
            {tiposReacciones.map((reaccion)=>(
                <TouchableOpacity onPress={()=>reaccionar(reaccion.id)} >
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
    card:{
        alignItems:'center',
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
        margin: 5
    }
});

export default Reacciones;