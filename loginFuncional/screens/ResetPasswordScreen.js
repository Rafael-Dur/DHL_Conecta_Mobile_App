import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
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
        title="Ingrese su correo electrónico" />

      <BackButton onPress={handleBack} />

      <InputField
        //label="Contraseña nueva"
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={secureTextEntry}
        setSecureTextEntry={setSecureTextEntry}
      />

      <InputField
        //label="Confirmar contraseña"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureTextEntry2}
        setSecureTextEntry={setSecureTextEntry2}


      />

      <Button
        title="Cambiar"
        onPress={handlePasswordReset}
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

});

export default ResetPasswordScreen;
