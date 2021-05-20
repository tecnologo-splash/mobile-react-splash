import React, {useState, useContext} from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ErrorFormulario from './ErrorFormulario';
import {Context as InicioSesionContext} from '../../context/InicioSesionContext';
import RecuperarPassword from './RecuperarPassword';
import ConfirmacionPasswordRecuperada from './ConfirmacionPasswordRecuperada';

const UsuarioContra = () => {
    const {state:{usuario, password}, cambiarValor, inicioSesion, recuperarPassword} = useContext(InicioSesionContext);
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
                    style={styles.input}
                    label="Email / Usuario"
                    placeholder="ejemplo@ejemplo.com / username"
                    value={usuario}
                    onChangeText={text => cambiarValor({variable: 'usuario', valor: text})}
                    left={
                        <TextInput.Icon name="account-box"/>
                    }
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    value={password}
                    secureTextEntry={secured}
                    placeholder="password"
                    onChangeText={text => cambiarValor({variable: 'password', valor: text})}
                    left={<TextInput.Icon name="key"/>}
                    right={<TextInput.Icon name="eye" onPress={()=>setSecured(!secured)}/>}
                />
                <Button
                    style={styles.button}
                    onPress={()=>login()}
                    icon="account"
                    mode="outlined"
                    color="#fff"
                >
                    Iniciar Sesion
                </Button>
                <Button
                    style={styles.button}
                    onPress={()=>navigation.navigate("Registro")}
                    icon="account-plus"
                    mode="outlined"
                    color="#fff"
                >
                    Registrarse
                </Button>
               <Text style={styles.forgot}>¿Olvidaste tu contraseña?... <Text style={styles.clickHere} onPress={()=>cambiarValor({variable: 'recuperar', valor: true})}> ¡Haz click aquí para recuperarla!</Text></Text>
            </View>
            <ErrorFormulario/>
            <ConfirmacionPasswordRecuperada/>
            <RecuperarPassword/>
        </View>
      );
}

const styles = StyleSheet.create({
    button:{
        margin: 10, 
        borderWidth:0
    },
    input:{
        margin:5
    },
    forgot:{
        color:'#fff',
        fontSize: 12,
        alignSelf:'center',
        margin: 10
    },
    clickHere:{
        fontWeight:'bold'
    }
})

export default UsuarioContra;