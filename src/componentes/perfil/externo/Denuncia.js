import React, {useContext, useState} from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { colores } from '../../../config/colores';
import { tipoDenuncia } from '../../../config/configs';
import {Context as PerfilContext} from '../../../context/PerfilContext';

const Denuncia = ({usuarioId,visible, setVisible}) => {
    const {denunciarPerfil} = useContext(PerfilContext);
    const [cargando, setCargando]=useState("");

    const den = async (tipo)=>{
        setCargando(tipo);
        const response = await denunciarPerfil({usuario_denunciado_id: usuarioId, tipo});
        if(response != null && response != undefined){
            Alert.alert("Denuncia enviada");
        }
        setVisible();
        setCargando("");
    }
  return (
    <Portal>
    <Dialog visible={visible} onDismiss={()=>setVisible()}>
        <Dialog.Title>Seleccione el tipo</Dialog.Title>
        <Dialog.Content>
            {tipoDenuncia.map(denuncia=>(
                <Button 
                mode="outlined"
                loading={cargando==denuncia.tipo}
                color={colores.gris} 
                onPress={()=>den(denuncia.tipo)} >
                {denuncia.nombre}
                </Button>
            ))}
        </Dialog.Content>
    </Dialog>
    </Portal>
  );
}

export default Denuncia;