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
            <FlatList
            horizontal
            data={tiposReacciones}
            keyExtractor={item=>item.id}
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>reaccionar(item.id)} >
                    <Image source={item.icono} style={styles.image}/>
                </TouchableOpacity>
                )}/>
        </View>
    );
  
}

const styles = StyleSheet.create({
    image:{
        height: 25,
        width: 25
    },
    card:{
        alignItems:'center',
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default Reacciones;