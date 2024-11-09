// LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../components/Button';
import TextField from '../components/InputField';
import Header from '../components/Header';
import InputField from '../components/InputField';

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
        <TouchableOpacity onPress={() => navigation.navigate('Validate_Mail')}>
          <Text style={styles.registerText}>¿Olvidó la contraseña?</Text>
        </TouchableOpacity>
        <Button title="Ingresar" onPress={() => { /* handle login */ }} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Regístrate ahora</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scrollContainer: {
    //justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 70,
    width: '70%',
  },
  registerText: {
    color: '#0000FF',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});