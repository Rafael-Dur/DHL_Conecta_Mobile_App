import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const navigation = useNavigation();

  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handlePasswordReset = () => {
    // Validar si los campos están llenos
    if (!newPassword.trim() || !confirmPassword.trim()) {
      return Alert.alert('Error', 'Por favor, complete todos los campos.');
    }

    // Validar que la nueva contraseña cumpla con los requisitos
    if (!validatePassword(newPassword)) {
      return Alert.alert(
        'Error de contraseña',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
      );
    }

    // Validar que ambas contraseñas coincidan
    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'Las contraseñas no coinciden.');
    }

    navigation.navigate('Login');
  };

  const handleBack = () => {
    navigation.navigate('Validate_Mail');
  };

  return (
    <View style={styles.container}>
      <Header title="Ingrese su nueva contraseña" />

      <BackButton onPress={handleBack} />

      <InputField
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={secureTextEntry}
        setSecureTextEntry={setSecureTextEntry}
      />

      <InputField
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureTextEntry2}
        setSecureTextEntry={setSecureTextEntry2}
      />

      <Button title="Cambiar" onPress={handlePasswordReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default ResetPasswordScreen;
