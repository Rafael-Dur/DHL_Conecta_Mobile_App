import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal'; // Importa el modal de éxito

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);
  const [isSuccessVisible, setSuccessVisible] = useState(false);

  const handleRegister = () => {
    if (!firstName) {
      Alert.alert('Error', 'El nombre es obligatorio!!!');
      return;
    }

    // Si todo está bien, mostramos el modal de éxito
    setSuccessVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Registrate!" subtitle="Crea una cuenta para continuar" />

        <TextField
          placeholder="Nombre"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextField
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextField
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          placeholder="Número de teléfono"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextField
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />
        <TextField
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={secureConfirmTextEntry}
          setSecureTextEntry={setSecureConfirmTextEntry}
        />
        <Button title="Registrarse" onPress={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>

        <SuccessModal
          visible={isSuccessVisible}
          onClose={() => setSuccessVisible(false)}
          title={"¡Registro exitoso!"}
          message="Tu registro se realizó correctamente"
          showButton={true}

        />
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
  registerText: {
    color: '#0000FF',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
