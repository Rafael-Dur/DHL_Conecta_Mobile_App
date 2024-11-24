import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '../features/auth/accountSlice'; // Thunk para manejar el endpoint
import Button from '../components/Button';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import ClickeableText from '../components/ClickeableText';
import { COLORS, FONT_SIZES } from '../constants/constants';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.account);

  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handlePasswordReset = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      return Alert.alert('Error', 'Por favor, complete todos los campos.');
    }
    if (!validatePassword(newPassword)) {
      return Alert.alert(
        'Error de contraseña',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
      );
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'Las contraseñas no coinciden.');
    }

    const payload = {
      email: 'sebaf@gmail.com', 
      code: '123456', 
      password: newPassword,
    };

    dispatch(resetPassword(payload))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          setResponseMessage('¡Contraseña actualizada con éxito!');
          setIsSuccessModalVisible(true);
        } else {
          setResponseMessage(action.payload?.message || 'No se pudo actualizar la contraseña.');
          setIsErrorModalVisible(true);
        }
      });
  };

  const handleCloseModal = () => {
    setIsErrorModalVisible(false);
    setIsSuccessModalVisible(false);
    if (isSuccessModalVisible) {
      navigation.navigate('Login');
    }
  };

  const handleBack = () => {
    navigation.navigate('Validate_Mail');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderContainer>
        <Header title="Cambiar" title2="contraseña" />
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

        <Button title={loading ? "Cargando..." : "Cambiar"} onPress={handlePasswordReset} disabled={loading} />
      </BodyContainer>

      <View style={styles.container2}></View>

      <ClickeableText
        navigation={navigation}
        onPress={() => navigation.navigate('Soporte')}
        title="¿Problemas?"
        clickeableText="Contáctanos"
        styleType="link"
      />

      {/* Modales */}
      <SuccessModal
        visible={isSuccessModalVisible}
        title="¡Éxito!"
        subtitle={responseMessage}
        onClose={handleCloseModal}
      />
      <ErrorModal
        visible={isErrorModalVisible}
        title="¡Hubo un error!"
        subtitle="No se pudo actualizar la contraseña."
        message={responseMessage}
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
    backgroundColor: '#fff',
    marginBottom: 50,
  },
});

export default ResetPasswordScreen;
