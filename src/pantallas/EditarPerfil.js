import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {Context as PerfilContext} from '../context/PerfilContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditarPerfil = () => {

  const {state:{nombre, apellido, fechaNac, biografia}, cambiarValor, cambiarFecha} = useContext(PerfilContext);
    
  const [fechaSeleccionada, setFechaSeleccionada] = useState(false);

  const onChangeFecha = (event, selectedDate) =>{
    var date = selectedDate || fechaNac;
    cambiarFecha(date);
    setFechaSeleccionada(false);
  }

  return <View>

      <Text>EditarPerfil</Text>

      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={text => cambiarValor(text)}
      />
      <TextInput
        label="Apellido"
        value={apellido}
        onChangeText={text => cambiarValor(text)}
      />

      {fechaSeleccionada? 
          <DateTimePicker
          mode="date"
          value={fechaNac}
          onChange={(event,selectedDate)=>onChangeFecha(event,selectedDate)}
          display="default"
          />
          :null}

      <Button
          style={styles.button}
          onPress={()=>setFechaSeleccionada(!fechaSeleccionada)}
          icon="calendar"
          mode="outlined"
          // color="#fff"
      />
      
      <TextInput
        label="Fecha"
        value={ fechaNac.toISOString().split('T')[0].split('-')[2] + "/" + fechaNac.toISOString().split('T')[0].split('-')[1] + "/" + fechaNac.toISOString().split('T')[0].split('-')[0] }
        disabled
      />
      
      

      <TextInput
        label="Biografia"
        value={biografia}
        onChangeText={text => cambiarValor(text)}
      />
  </View>;
}

const styles = StyleSheet.create({
  button:{
      margin: 10, 
      borderWidth:0
  },
  
});


export {EditarPerfil};