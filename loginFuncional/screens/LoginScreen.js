// LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import InputField from '../components/InputField';
import UnderlineText from '../components/UnderlineText';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Bienvenido a" title2={"Envíos DHL Conecta"} />
        <InputField
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />
        <UnderlineText title="¿Olvidó la contraseña?" navigateTo='Validate_Mail' />
        <Button title="Ingresar" onPress={() => { /* handle login */ }} />
        <UnderlineText title="Regístrate ahora" navigateTo='Register' />

      </ScrollView>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 70,
    paddingLeft: 70,
    paddingRight: 70,
    width: '100%',
    //marginLeft: 10,
    //marginRight: 10,
  },
});