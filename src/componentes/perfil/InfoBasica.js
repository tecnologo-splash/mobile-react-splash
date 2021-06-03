import React from 'react';
import {ListItem} from 'react-native-elements';

const InfoBasica = ({nombre,apellido,usuario,correo}) => {
  return (
    <ListItem.Content>
    <ListItem.Title>{nombre} {apellido}</ListItem.Title>
    <ListItem.Subtitle>{usuario}</ListItem.Subtitle>
    <ListItem.Subtitle>{correo}</ListItem.Subtitle>
  </ListItem.Content>
  );
}

export default InfoBasica;