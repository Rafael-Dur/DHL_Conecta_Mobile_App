import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import ClickeableText from '../components/ClickeableText';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import { useDispatch, useSelector } from 'react-redux';
import { requestOtp, saveEmail } from '../features/auth/accountSlice';
import { COLORS } from '../constants/constants';
import BackButton from '../components/BackButton';

const ValidateMailScreen = () => {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { code, loading, errorMsg, success } = useSelector((state) => state.account);

  // Validación del correo electrónico
  const validateEmail = (email) => /^[\w.-]+@(gmail|hotmail|yahoo)\.com$/.test(email);

  const handleContinue = () => {
    if (!email.trim()) {
      return Alert.alert('Error', 'El correo es obligatorio.');
    }

    if (!validateEmail(email)) {
      return Alert.alert(
        'Correo inválido',
        'El correo debe ser válido y pertenecer a dominios como gmail, hotmail o yahoo.'
      );
    }

    const validateData = { email };
    dispatch(requestOtp(validateData))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled' && success) {
          setResponseMessage(code || '¡Código enviado con éxito!');
          //  setIsSuccessModalVisible(true);
        } else {
          const errorMsg = action.payload?.message || 'Ocurrió un error al enviar el código.';
          setResponseMessage(errorMsg);
          //    setIsErrorModalVisible(true);
        }
      });

    dispatch(saveEmail(email)); // Guarda el correo en Redux
    navigation.navigate('Security_Code');
  };

  const handleCloseModal = () => {
    setIsErrorModalVisible(false);
    setIsSuccessModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeaderContainer>
        <Header title="Ingrese su correo" title2="electrónico" />
      </HeaderContainer>

      <BodyContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <InputField
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button title={loading ? "Cargando..." : "Continuar"} onPress={handleContinue} disabled={loading} />

        {loading && <Text style={styles.loadingText}>Enviando código...</Text>}

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
        subtitle="No se pudo enviar el código."
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
    flex: 1,
  },

  loadingText: {
    color: COLORS.gray,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ValidateMailScreen;
