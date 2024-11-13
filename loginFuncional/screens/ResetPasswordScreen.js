import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import PasswordField from '../components/PasswordField';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';


const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handlePasswordReset = () => {
    // Lógica para cambiar la contraseña
    navigation.navigate('Login');
  };

  const handleBack = () => {
    navigation.navigate('Validate_Mail');
  };

  return (
    <View style={styles.container}>
        <Header 
        title="Ingrese su correo electrónico"/>

         <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="red" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <InputField
          //label="Contraseña nueva"
          placeholder="Nueva Contraseña"
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

        <InputField
          //label="Confirmar contraseña"
          placeholder="Confirmar Contraseña"
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'right',
    marginBottom: 50,
    marginLeft: 220,

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
