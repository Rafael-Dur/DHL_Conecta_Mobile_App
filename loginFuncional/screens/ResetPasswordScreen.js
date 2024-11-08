import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import PasswordField from '../components/PasswordField';
import { useNavigation } from '@react-navigation/native';


const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handlePasswordReset = () => {
    // Lógica para cambiar la contraseña
  };

  const handleBack = () => {
    navigation.navigate('Validate_Mail');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/LogoDHL.png')} style={styles.logo} />
      <Text style={styles.title}>Cambiar contraseña</Text>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={24} color="red" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <PasswordField
        //label="Contraseña nueva"
        placeholder="Nueva Contraseña"
        placeholderTextColor="#999"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={!isNewPasswordVisible}
        rightIcon={
          <TouchableOpacity onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
            <Ionicons
              name={isNewPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        }
      />

      <PasswordField
        //label="Confirmar contraseña"
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!isConfirmPasswordVisible}
        rightIcon={
          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Ionicons
              name={isConfirmPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        }
      />

      <Button
        title="Cambiar"
        onPress={handlePasswordReset}
        style={styles.changeButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 280,
  },
  backText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 5,
  },
  changeButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'red',
  },
});

export default ResetPasswordScreen;
