import React, {useState} from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login, getToken } from '../servicios/auth';

const UsuarioContra = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const inicioSesion = () => {
        login(usuario,password);
        console.log("usuario", usuario);
        console.log("password", password);
    }

    return (
        <View>
            <View>
                <TextInput
                    style={{margin:5}}
                    label="Email"
                    placeholder="ejemplo@ejemplo.com"
                    value={usuario}
                    onChangeText={text => setUsuario(text)}
                    left={
                        <TextInput.Icon name="account-box"/>
                    }
                />
                <TextInput
                    style={{margin:5}}
                    label="Password"
                    value={password}
                    placeholder="password"
                    onChangeText={text => setPassword(text)}
                    left={<TextInput.Icon name="key"/>}
                />
                <Button
                    style={{margin: 10, borderWidth:0}}
                    onPress={()=>inicioSesion()}
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
        </View>
      );
}

export default UsuarioContra;