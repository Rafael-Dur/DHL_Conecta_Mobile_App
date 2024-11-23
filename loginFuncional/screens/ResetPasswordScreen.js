import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import ClickeableText from '../components/ClickeableText';
import { COLORS, FONT_SIZES } from '../constants/constants';


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
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderContainer>
        <Header title="Cambiar"  title2="contraseña" />
      </HeaderContainer>

      <BodyContainer>

      <BackButton onPress={handleBack} />

      <Text style={styles.label}>Ingrese su nueva contraseña</Text>

      <InputField
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={secureTextEntry}
        setSecureTextEntry={setSecureTextEntry}
      />

      <Text style={styles.label}>Repita la contraseña</Text>

      <InputField
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureTextEntry2}
        setSecureTextEntry={setSecureTextEntry2}
      />

      <Button title="Cambiar" onPress={handlePasswordReset} />

      </BodyContainer>

      <View style={styles.container2}></View>

      <ClickeableText
          navigation={navigation}
          onPress={() => navigation.navigate(/* Pagina de soporte */)}
          title="¿Problemas?"
          clickeableText="Contáctanos"
          styleType="link"
        />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.medium,
    width: '100%',
    maxWidth: 350,
  },
  container2: {
    //flex: 1,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
});

export default ResetPasswordScreen;
