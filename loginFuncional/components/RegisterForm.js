import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from './InputField';
import Button from './Button';
import ErrorAlert from './ErrorAlert';
import { COLORS } from '../constants/constants';
//import PhoneInput from 'react-native-phone-number-input';

export default function RegisterForm({ onRegister }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(''); // Almacena el número formateado
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  const validateEmail = (email) => /^[\w.-]+@(gmail|hotmail|yahoo)\.com$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleRegister = () => {
    if (!firstName.trim()) return ErrorAlert('El nombre es obligatorio.');
    if (!lastName.trim()) return ErrorAlert('El apellido es obligatorio.');
    if (!email.trim() || !validateEmail(email))
      return ErrorAlert('El correo debe ser válido y pertenecer a gmail, hotmail, yahoo o similar.');
    if (!formattedPhoneNumber.trim())
      return ErrorAlert('Por favor, ingresa un número de teléfono válido.');
    if (!validatePassword(password))
      return ErrorAlert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
    if (password !== confirmPassword)
      return ErrorAlert('Las contraseñas no coinciden.');

    const registerData = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber: "+59897679522"//formattedPhoneNumber, // Usar el número formateado
    };

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: '100%',
    marginBottom: 15,
    height: 50, // Asegura que todos tengan la misma altura
    paddingHorizontal: 10,
  },
  phoneInputContainer: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: '90%',
    maxWidth: '100%',
    height: 50, // Misma altura que los demás
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  phoneInputTextContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 0, // Elimina márgenes adicionales
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    padding: 0, // Ajuste interno para evitar desbordes
  },
  flagButton: {
    marginRight: 10,
  },
});



