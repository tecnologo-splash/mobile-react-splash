import React, {useState, useContext} from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ErrorFormulario from './ErrorFormulario';
import {Context as InicioSesionContext} from '../context/InicioSesionContext';

const UsuarioContra = () => {
    const {state:{usuario, password}, cambiarValor, inicioSesion} = useContext(InicioSesionContext);
    const [secured, setSecured] = useState(true);
    const navigation = useNavigation();

    const login = ()=>{
        inicioSesion({usuario,password});
        navigation.navigate("BottomTab");
    }

    return (
        <View>
            <View>
                <TextInput
                    style={{margin:5}}
                    label="Email"
                    placeholder="ejemplo@ejemplo.com"
                    value={usuario}
                    onChangeText={text => cambiarValor({variable: 'usuario', valor: text})}
                    left={
                        <TextInput.Icon name="account-box"/>
                    }
                />
                <TextInput
                    style={{margin:5}}
                    label="Password"
                    value={password}
                    secureTextEntry={secured}
                    placeholder="password"
                    onChangeText={text => cambiarValor({variable: 'password', valor: text})}
                    left={<TextInput.Icon name="key"/>}
                    right={<TextInput.Icon name="eye" onPress={()=>setSecured(!secured)}/>}
                />
                <Button
                    style={{margin: 10, borderWidth:0}}
                    onPress={()=>login()}
                    icon="account"
                    mode="outlined"
                    color="#fff"
                >
                    Iniciar Sesion
                </Button>
                <Button
                    style={{margin: 10, borderWidth:0}}
                    onPress={()=>navigation.navigate("Registro")}
                    icon="account-plus"
                    mode="outlined"
                    color="#fff"
                >
                    Registrarse
                </Button>
            </View>
            <ErrorFormulario/>
        </View>
      );
}

export default UsuarioContra;