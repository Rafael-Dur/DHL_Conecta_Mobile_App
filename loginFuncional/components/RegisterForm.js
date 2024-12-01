import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import InputField from './InputField';
import Button from './Button';
import ErrorAlert from './ErrorAlert';
import { COLORS } from '../constants/constants';

export default function RegisterForm({ onRegister }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date()); // Estado para la fecha de nacimiento
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  const validateEmail = (email) => /^[\w.-]+@(gmail|hotmail|yahoo)\.com$/.test(email);
  const validatePhone = (phone) => /^[0-9]{8,9}$/.test(phone);
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleRegister = () => {
    if (!firstName.trim()) return ErrorAlert('El nombre es obligatorio.');
    if (!lastName.trim()) return ErrorAlert('El apellido es obligatorio.');
    if (!email.trim() || !validateEmail(email))
      return ErrorAlert('El correo debe ser válido y pertenecer a gmail, hotmail, yahoo o similar.');
    if (!phone.trim() || !validatePhone(phone))
      return ErrorAlert('Número de teléfono no válido en Uruguay.');
    if (!validatePassword(password))
      return ErrorAlert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
    if (password !== confirmPassword)
      return ErrorAlert('Las contraseñas no coinciden.');

    // Preparar los datos para enviar
    const registerData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: "1985-11-22T15:29:42.850Z",
      phoneNumber: phone,
      socialIdCardNumber: phone, // Número de cédula ??
    };

    // Llama a la función onRegister pasada desde RegisterScreen
    onRegister(registerData);
  };


  return (
    <View style={styles.container}>
      <InputField placeholder="Nombre" value={firstName} onChangeText={setFirstName} />
      <InputField placeholder="Apellido" value={lastName} onChangeText={setLastName} />
      <InputField
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InputField
        placeholder="Número de teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <InputField
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        setSecureTextEntry={setSecureTextEntry}
        iconName="lock-closed-outline"
      />
      <InputField
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureConfirmTextEntry}
        setSecureTextEntry={setSecureConfirmTextEntry}
        iconName="lock-closed-outline"
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    alignItems: 'center',
  },
  dateText: {
    color: COLORS.gray,
    fontSize: 16,
    marginVertical: 10,
  },
});
