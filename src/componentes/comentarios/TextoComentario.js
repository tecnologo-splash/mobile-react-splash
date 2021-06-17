import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';
import { FAB, Portal } from 'react-native-paper';
import { colores } from '../../config/colores';
import { Context as ComentariosContext } from '../../context/ComentariosContext';

const TextoComentario = ({publicacionId}) => {
    const [texto, setTexto]= useState('');
    const {crearComentario}= useContext(ComentariosContext);

    const agregarNuevoComentario = ()=> {
        crearComentario({text:texto, publicacionId});
    }

  return (
          <Portal>
            <View style={styles.mainContainer}>
            <Input
            placeholder='Comentario'
            value={texto}
            onChangeText={(text)=>setTexto(text)}
            />
            <FAB
            style={styles.fab}
            small
            icon="comment-plus"
            onPress={() => agregarNuevoComentario()}
            />
            </View>
        </Portal>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems:'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    fab: {
        backgroundColor: colores.appDefault,
        margin:15
    }
})

export default TextoComentario;