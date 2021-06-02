import React from 'react';
import { View } from 'react-native';

import ListadoSeguidores from './ListadoSeguidores';
import ListaFiltros from './ListaFiltros';
import SearchBar from './SearchBar';

const SeguidoresSeguidos = ({lista}) => {
  return (
        <View>
          <SearchBar/>
          <ListaFiltros/>
          <ListadoSeguidores usuarios={lista}/>
        </View>
  );
}

export default SeguidoresSeguidos;