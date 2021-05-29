import React, {useContext,useEffect} from 'react';
import PerfilBody from '../componentes/perfil/PerfilBody';
import {Context as PerfilContext} from '../context/PerfilContext';


const Perfil = ({navigation}) => {

  const {state:{currentUser}, getInfo} = useContext(PerfilContext);

  useEffect(()=>{
    getInfo();
  },[]);
  
  return (
    <PerfilBody usuario={currentUser}/>
  );
}



export {Perfil};