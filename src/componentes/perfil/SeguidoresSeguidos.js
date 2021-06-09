import React from 'react';
import { SafeAreaView } from 'react-native';

import ListadoSeguidores from './ListadoSeguidores';
import ListaFiltros from './ListaFiltros';
import SearchBar from './SearchBar';

const SeguidoresSeguidos = ({lista}) => {
  return (
        <SafeAreaView >
          <SearchBar/>
          <ListaFiltros/>
          <ListadoSeguidores usuarios={lista}/>
        </SafeAreaView>
  );
}

export default SeguidoresSeguidos;