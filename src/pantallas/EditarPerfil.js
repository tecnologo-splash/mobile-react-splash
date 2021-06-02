import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button,Title } from 'react-native-paper';
import {Context as PerfilContext} from '../context/PerfilContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native';


const EditarPerfil = () => {

  const {state:{currentUser, nombre, apellido, fechaNac, biografia}, cambiarValor, cambiarFecha, editarPerfil, getInfo} = useContext(PerfilContext);
    
  const [fechaSeleccionada, setFechaSeleccionada] = useState(false);

  const onChangeFecha = (event, selectedDate) =>{
    var date = selectedDate || fechaNac;
    cambiarFecha(date);
    setFechaSeleccionada(false);
  }

  const onSubmit = () => {
    console.log(currentUser)

    let formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    //formData.append('fechaNac', fechaNac); descomentar para modificar la fecha
    formData.append('biografia', biografia);

    // editarPerfil(currentUser.id, formData).then( data => getInfo()); descomentar para que funque
    editarPerfil(77, formData).then( data => getInfo());// descomentar para que funque
  }


  return (
  <View style={styles.body}>

      {/* <Title>Editar perfil</Title> */}

      <ScrollView style={styles.container}>
        <TextInput
          label={currentUser.nombre}
          value={nombre}
          onChangeText={text => cambiarValor({variable: 'nombre', valor: text})}
        />
        
        <TextInput
          label={currentUser.apellido}
          value={apellido}
          onChangeText={text => cambiarValor({variable: 'apellido', valor: text})}
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
          onChangeText={text => cambiarValor({variable: 'biografia', valor: text})}
        />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={()=>onSubmit()}
      > Guardar Datos</Button>
  </View>);
}

const styles = StyleSheet.create({
  button:{
      margin: 10, 
      borderWidth:0
  },
  body:{
    margin: 5
  },
  container:{
    margin: 10
  }
  
});


export {EditarPerfil};