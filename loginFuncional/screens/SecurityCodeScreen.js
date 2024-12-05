import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ClickeableText from '../components/ClickeableText';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import { useSelector } from 'react-redux';
import { COLORS, FONT_SIZES } from '../constants/constants';

const SecurityCodeScreen = () => {
  const storedCode = useSelector((state) => state.account.code); // Código almacenado en Redux
  const [securityCode, setSecurityCode] = useState('');
  const navigation = useNavigation();
  let otpInput = null;

  // Sincroniza el código almacenado con el estado local
  useEffect(() => {
    if (storedCode) {
      setSecurityCode(storedCode);
    }
  }, [storedCode]);

  // Validación del código de seguridad
  const validateSecurityCode = (code) => /^\d{6}$/.test(code);

  const handleContinue = () => {
    if (!securityCode.trim()) {
      return Alert.alert('Error', 'Por favor, ingrese el código de seguridad.');
    }

    if (!validateSecurityCode(securityCode)) {
      return Alert.alert(
        'Código inválido',
        'El código debe contener exactamente 6 dígitos numéricos.'
      );
    }

    if (securityCode !== storedCode) {
      return Alert.alert('Error', 'El código ingresado no es correcto.');
    }

    navigation.navigate('Reset_Password');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <HeaderContainer>
            <Header title="Ingrese código" title2="de seguridad" />
          </HeaderContainer>

          <BodyContainer>
            <BackButton onPress={() => navigation.goBack()} />

            <OTPTextInput
              ref={(e) => (otpInput = e)}
              inputCount={6}
              handleTextChange={setSecurityCode}
              containerStyle={styles.otpContainer}
              textInputStyle={styles.otpInput}
            />

            <Text style={styles.instructionText}>
              Accede a tu correo electrónico{"\n"}para obtener el código de recuperación.
            </Text>

            <Button title="Continuar" onPress={handleContinue} />

            <ClickeableText
              navigation={navigation}
              onPress={() => navigation.navigate('Support')}
              title="¿Problemas?"
              clickeableText="Contáctanos"
              styleType="link"
            />
          </BodyContainer>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    flexGrow: 1,
  },
  otpContainer: {
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    color: COLORS.black,
    fontSize: FONT_SIZES.medium,
    textAlign: 'center',
    width: 50,
    height: 50,
    marginHorizontal: 5,
    flex: 1,
  },
  instructionText: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: FONT_SIZES.medium,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SecurityCodeScreen;
