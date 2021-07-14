import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card} from 'react-native-paper';
import { StyleSheet, Image} from 'react-native';
import { Popable } from 'react-native-popable';
import { MaterialIcons } from '@expo/vector-icons';
import { colores } from '../../config/colores';
import Reacciones from './Reacciones';
import { tiposReacciones } from '../../config/configs';
import {Context as ComentariosContext} from '../../context/ComentariosContext';
import {Context as PublicacionContext} from '../../context/PublicacionContext';

const BotonesPublicacion = ({publicacion}) => {
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    const{setComentarios} = useContext(ComentariosContext);
    const {eliminarReaccion} = useContext(PublicacionContext);
    var [selected] = tiposReacciones.filter(i=>i.id===index);
    useEffect(()=>{
        if(publicacion.resumen_reaccion.mi_reaccion){
            var [r] = tiposReacciones.filter(item=> item.tipo===publicacion.resumen_reaccion.mi_reaccion);
            setIndex(r.id);
        }
    },[])

    const irAComentarios = ()=> {
        setComentarios(publicacion.comentarios);
        navigation.navigate("Comentarios",{publicacion: publicacion});
    }

  return (
        <Card.Content style={styles.container}>
            <Popable
            backgroundColor={colores.appDefault}
            onLongPress={()=>eliminarReaccion({publicacionId: publicacion.id})}
            content={<Reacciones setIndex={index=>setIndex(index)} publicacionId={publicacion.id} miReaccion={publicacion.resumen_reaccion.mi_reaccion}/>}>
                {publicacion.resumen_reaccion.mi_reaccion? 
                    <Button 
                    mode="outlined"
                    color={colores.appDefault}
                    style={{borderWidth:0, borderWidth: 1, borderColor: colores.appDefault}}
                    icon= {()=>(<Image style={styles.image} source={selected.icono}/>)}
                    >
                        {selected.texto}
                    </Button>
                    :
                    <Button 
                    mode="outlined"
                    style={{borderWidth:0}}
                    icon= {()=>(<Image style={styles.image} source={selected.icono}/>)}
                    >
                        {selected.texto}
                    </Button>
                }
            </Popable>
            <Button 
            mode="outlined"
            style={{borderWidth:0}} 
            onPress={() => irAComentarios()}
            icon={()=>(<MaterialIcons name="insert-comment" size={22} color={colores.appDefault} />)}>
                Comentar {publicacion.comentarios.length>0? "("+publicacion.comentarios.length+")" : null }
            </Button>
        </Card.Content>
  );
}

const styles = StyleSheet.create({
    image:{
        height: 25,
        width: 25
    },
    container: {
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    card:{
        alignItems:'flex-start',
        flexDirection:'row'
    }
});

export default BotonesPublicacion;