import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card} from 'react-native-paper';
import { StyleSheet, Image} from 'react-native';
import { Tooltip } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { colores } from '../../config/colores';
import Reacciones from './Reacciones';
import { tiposReacciones } from '../../config/configs';

const BotonesPublicacion = ({publicacion}) => {
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    var [selected] = tiposReacciones.filter(i=>i.id===index);

    useEffect(()=>{
        if(publicacion.resumen_reaccion.mi_reaccion){
            var [r] = tiposReacciones.filter(item=> item.tipo===publicacion.resumen_reaccion.mi_reaccion);
            setIndex(r.id);
        }
    },[])
  return (
        <Card.Content style={styles.container}>
            <Tooltip
            backgroundColor={colores.appDefault}
            withOverlay={false}
            popover={<Reacciones setIndex={index=>setIndex(index)} publicacionId={publicacion.id} miReaccion={publicacion.resumen_reaccion.mi_reaccion}/>}>
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
            </Tooltip>
            <Button 
            mode="outlined"
            style={{borderWidth:0}} 
            onPress={() => navigation.navigate("Comentarios",{publicacionId: publicacion.id})}
            icon={()=>(<MaterialIcons name="insert-comment" size={22} color={colores.appDefault} />)}>
                Comentar
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
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    card:{
        alignItems:'flex-start',
        flexDirection:'row'
    }
});

export default BotonesPublicacion;