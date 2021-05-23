import React, {useContext, useState} from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Context as CrearCuentaContext} from '../../context/CrearCuentaContext';
import Error from './Error';

const Formulario = () => {
    const {state:{usuario, correo, nombre, apellido, clave, confirmar, fecha, genero}, cambiarFecha, cambiarValor, crearCuenta, validarPassword} = useContext(CrearCuentaContext);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(false);

    const onChangeFecha = (event, selectedDate) =>{
        var fecha = selectedDate || fecha;
        cambiarFecha(fecha);
        setFechaSeleccionada(false);
    }

    const crear = ()=>{
        var coinciden= validarPassword({clave, confirmar});
        if(coinciden){
            var mes = fecha.getMonth()<10 ? `0${fecha.getMonth()}`: fecha.getMonth();
            var dia = fecha.getDay()<10 ? `0${fecha.getDay()}`: fecha.getDay();
            var user = {usuario, correo, nombre, apellido, clave, fecha_nacimiento: `${fecha.getFullYear()}-${mes}-${dia}` , genero};
            crearCuenta(user);
        }        
    }

    return (
    <ScrollView>
        <View style={styles.main}>
            <View style={styles.main2}>
                <TextInput
                    style={styles.input}
                    label="Email"
                    placeholder="ejemplo@ejemplo.com"
                    value={correo}
                    onChangeText={text => cambiarValor({variable: 'correo', valor: text})}
                />
                <TextInput
                    style={styles.input}
                    label="Nombre de Usuario"
                    placeholder="abc123"
                    value={usuario}
                    onChangeText={text => cambiarValor({variable: 'usuario', valor: text})}
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    value={clave}
                    secureTextEntry
                    placeholder="password"
                    onChangeText={text => cambiarValor({variable: 'clave', valor: text})}
                />

                <TextInput
                    style={styles.input}
                    label="Confirmar Password"
                    value={confirmar}
                    secureTextEntry
                    placeholder="password"
                    onChangeText={text => cambiarValor({variable: 'confirmar', valor: text})}       
                    />

                <TextInput
                    style={styles.input}
                    label="Nombre"
                    value={nombre}
                    placeholder="Juan"
                    onChangeText={text => cambiarValor({variable: 'nombre', valor: text})}
                />

                <TextInput
                    style={styles.input}
                    label="Apellido"
                    value={apellido}
                    placeholder="Perez"
                    onChangeText={text => cambiarValor({variable: 'apellido', valor: text})}
                />
                <Picker
                    selectedValue={genero}
                    onValueChange={(itemValue, itemIndex) =>
                        cambiarValor({variable: 'genero', valor: itemValue})
                    }>
                    <Picker.Item label="HOMBRE" value="HOMBRE" />
                    <Picker.Item label="MUJER" value="MUJER" />
                    <Picker.Item label="OTRO" value="OTRO" />
                </Picker>

                {fechaSeleccionada? 
                    <DateTimePicker
                    mode="date"
                    value={fecha}
                    onChange={(event,selectedDate)=>onChangeFecha(event,selectedDate)}
                    display="default"
                    />
                    :null}

                <Button
                    style={styles.button}
                    onPress={()=>setFechaSeleccionada(!fechaSeleccionada)}
                    icon="calendar"
                    mode="outlined"
                    color="#fff"
                >
                    Fecha de Nacimiento
                </Button>

                <Button
                    style={styles.button}
                    onPress={()=>crear()}
                    icon="account"
                    mode="outlined"
                    color="#fff"
                >
                    Crear Cuenta
                </Button>

                <Button
                    style={styles.button}
                    onPress={()=>navigation.navigate("InicioSesion")}
                    icon="account-plus"
                    mode="outlined"
                    color="#fff"
                >
                    Cancelar
                </Button>
            </View>
            <Error/>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    button:{
        margin: 10, 
        borderWidth:0
    },
    input:{
        margin:10
    },
    main:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        marginLeft: 5,
        marginRight:5
    },
    main2:{
        flex:1,
        flexDirection:'column'
    },
});

export default Formulario;