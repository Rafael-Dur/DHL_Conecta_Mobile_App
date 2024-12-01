import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '../features/auth/accountSlice';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import ClickeableText from '../components/ClickeableText';
import { COLORS } from '../constants/constants';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, email } = useSelector((state) => state.account); // Obtiene el email desde Redux

  // Validar contraseña
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  // Manejar el restablecimiento de contraseña
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
      email, // Email desde Redux
      code: '123456', // Código fijo (cambiar si es dinámico)
      password: newPassword,
    };

    dispatch(resetPassword(payload)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        setResponseMessage('¡Contraseña actualizada con éxito!');
        setIsSuccessModalVisible(true);
      } else {
        setResponseMessage(action.payload?.message || 'No se pudo actualizar la contraseña.');
        setIsErrorModalVisible(true);
      }
    });
  };

  // Cerrar modales
  const handleCloseModal = () => {
    setIsErrorModalVisible(false);
    setIsSuccessModalVisible(false);
    if (isSuccessModalVisible) {
      navigation.navigate('Login');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeaderContainer>
        <Header title="Cambiar contraseña"/>
      </HeaderContainer>

      <BodyContainer>
        <BackButton onPress={() => navigation.goBack()} />
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

        <Button
          title={loading ? 'Cargando...' : 'Cambiar'}
          onPress={handlePasswordReset}
          disabled={loading}
        />

        {loading && <Text style={styles.loadingText}>Actualizando contraseña...</Text>}

        <ClickeableText
          navigation={navigation}
          onPress={() => navigation.navigate('Support')}
          title="¿Problemas?"
          clickeableText="Contáctanos"
          styleType="link"
        />
      </BodyContainer>

      {/* Modales */}
      <SuccessModal
        visible={isSuccessModalVisible}
        title="¡Éxito!"
        subtitle={responseMessage}
        onClose={handleCloseModal}
      />
      <ErrorModal
        visible={isErrorModalVisible}
        title="¡Hubo un problema!"
        subtitle="No se pudo actualizar la contraseña."
        message={responseMessage}
        onClose={handleCloseModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  loadingText: {
    color: COLORS.gray,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ResetPasswordScreen;
