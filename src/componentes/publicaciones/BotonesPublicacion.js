import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card} from 'react-native-paper';
import { StyleSheet, Image} from 'react-native';
import { Tooltip } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { colores } from '../../config/colores';


const BotonesPublicacion = () => {
    const [index, setIndex] = useState(2);
    const navigation = useNavigation();
    //var [selected] = images.emojis.filter(i=>i.index===index);
  return (
        <Card.Content style={styles.container}>
            {/* <Tooltip
            backgroundColor="#6d31bf"
            overlayColor='rgba(0,0,0,0)'
            popover={<Reacts setIndex={index=>setIndex(index)}/>}>
               <Button 
                mode="outlined"
                style={{borderWidth:0}}
                icon= {()=>(<Image style={styles.image} source={selected.img}/>)}
                >
                    {selected.text}
               </Button>
            </Tooltip> */}
            <Button 
            mode="outlined"
            style={{borderWidth:0}} 
            onPress={() => navigation.navigate("Comentarios")}
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