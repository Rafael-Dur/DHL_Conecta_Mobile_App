import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/LogoDHL.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenido a</Text>
      <Text style={styles.title2}>Envíos DHL Conecta</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Regístrate ahora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    marginBottom: 20,
    maxHeight: "auto",
    maxWidth: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    width: '80%',
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: "auto",
    marginBottom: 15,
    maxHeight: 40,
    maxWidth: 350,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#0000FF',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
