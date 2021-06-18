import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';
import { FAB, Portal } from 'react-native-paper';
import { colores } from '../../config/colores';
import { Context as ComentariosContext } from '../../context/ComentariosContext';

const TextoComentario = ({publicacionId}) => {
    const [texto, setTexto]= useState('');
    const {state:{comentario_a_responder},crearComentario}= useContext(ComentariosContext);

    const agregarNuevoComentario = async ()=> {
        await crearComentario({text:texto, publicacionId});
        setTexto("");
    }

  return (
          <Portal>
            <View style={styles.mainContainer}>
                <View style={styles.form}>
                    <Input
                    style={styles.input}
                    placeholder={comentario_a_responder.id != -1?`Responder a ${comentario_a_responder.usuario}`:'Comentario'}
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
            </View>
        </Portal>
  );
}

const styles = StyleSheet.create({
    input:{
        margin:5,
        flex:2
    },
    mainContainer: {
        padding:15,
        flex:1,
        alignItems:'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    form: {
        padding:15,
        backgroundColor: colores.blanco,
        borderRadius:20,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    fab: {
        backgroundColor: colores.appDefault,
        margin:20
    }
})

export default TextoComentario;