import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  const handleRegister = () => {
    if (!firstName) {
      Alert.alert('Error', 'El nombre es obligatorio.');
      return;
    }
    // Aquí puedes agregar más validaciones si es necesario

    // Lógica de registro
    Alert.alert('Registro exitoso', '¡Bienvenido!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/LogoDHL.png')} style={styles.logo} />
        <Text style={styles.title}>Registrate!</Text>
        <Text style={styles.subtitle}>Crea una cuenta para continuar</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
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
            placeholder="Número de teléfono"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirmTextEntry}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}
          >
            <Ionicons name={secureConfirmTextEntry ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 70,
  },
  logo: {
    marginBottom: 20,
    maxHeight: "auto",
    maxWidth: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    maxWidth: 350,
    marginBottom: 15,
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
