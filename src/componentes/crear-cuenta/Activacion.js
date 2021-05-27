import React, {useContext, useEffect} from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, TextInput, Dialog, Portal } from 'react-native-paper';
import {Context as CrearCuentaContext} from '../../context/CrearCuentaContext';
import { useNavigation } from '@react-navigation/native';

const Activacion = ({activar, setActivar}) => {
    const {state:{claveActivacion, error, correo,entrar}, activarCuenta, cambiarValor} = useContext(CrearCuentaContext);
    const navigation = useNavigation();

    
    if(entrar){
        navigation.navigate('InicioSesion');
    }
    const cerrarDialogo = ()=>{
        activarCuenta({codigo: claveActivacion, correo: correo});
        setActivar(false);

    }
  return (
    <Portal>
    <Dialog visible={error? true: activar ? true:false}>
        <Dialog.Title>Ingrese la clave de activación que se le envió al correo que ingresó</Dialog.Title>
        <Dialog.Content>

            <TextInput
                style={styles.input}
                label="Codigo"
                value={claveActivacion}
                secureTextEntry
                placeholder="codigo"
                onChangeText={text => cambiarValor({variable: 'claveActivacion', valor: text})}
            />

            {error? <Text style={styles.text}>Ingrese la Clave de Activacion correctamente</Text>:null}
            
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={()=>cerrarDialogo()}>Activar Cuenta</Button>
        </Dialog.Actions>
    </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
    input:{
        margin:10
    },
    text:{
        fontSize:18,
        color: 'red'
    }
});

export default Activacion;